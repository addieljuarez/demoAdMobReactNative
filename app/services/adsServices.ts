import { Platform } from 'react-native'
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads'

const AD_UNIT_IDS = {
  banner: {
    ios: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
    android: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXX/XXXXXXXX'
  },
  interstitial: {
    ios: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
    android: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXX/XXXXXXXX'
  }
}

class AdsService {
  private interstitialAd: InterstitialAd | null = null
  private isInterstitialLoaded = false
  private lastInterstitialTime = 0
  private readonly MIN_INTERVAL = 120000

  constructor () {
    this.initializeInterstitial()
  }

  // obtener el ID 
  private getAdUnitId(type: 'banner' | 'interstitial'): string {
    const platform = Platform.OS as 'ios' | 'android'
    return AD_UNIT_IDS[type][platform]
  }

  // Inicializar Interstitial
  private initializeInterstitial (): void {
    const adUnitId = this.getAdUnitId('interstitial')
    console.log('adUnitId', adUnitId)
    this.interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true
    })

    //Events Listener de interstitial
    this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      this.isInterstitialLoaded = true
      console.log('✅ Interstitial ad loaded')
    })

    this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      this.isInterstitialLoaded = false
      console.log(' Interstitial ad Closed')
      this.loadInterstitial()
    })

    this.interstitialAd.addAdEventListener(AdEventType.ERROR, () => {
      this.isInterstitialLoaded = false
      console.log('❌ Interstitial ad Error')
      // reintentar a los 30 segundo
      console.log('reintentar a los 30 segundo')
      setTimeout(() => this.loadInterstitial(), 30000)
    })

    this.loadInterstitial()
  }

  // aqui carga el interstitial
  loadInterstitial(): void {
    if(!this.isInterstitialLoaded && this.interstitialAd) {
      this.interstitialAd.load()
      console.log('lee el interstitialAd.load()')
    }
  }

  // Aqui muestra el interstitial con control de frecuencia
  async showInterstitial(): Promise<boolean> {
    const now = Date.now()
    console.log('el now', now)
    const timeSinceLastAd = now - this.lastInterstitialTime
    console.log('el timeSinceLastAd', timeSinceLastAd)

    // aqui no lo mmuestra si no ha pasado el tiempo minimo
    if(timeSinceLastAd < this.MIN_INTERVAL) {
      console.log('⏳ Esperando antes de mostrar el proximo Ad')
      return false
    }

    if(this.isInterstitialLoaded && this.interstitialAd) {
      try {
        await this.interstitialAd.show()
        this.lastInterstitialTime = now
        return true
      } catch (error) {
        console.error('Error al mostrar interstitial:', error)
      }
    }
    return false
  }

  // Obtener ID de banner
  getBannerAdUnitId(): string {
    console.log('this.getAdUnitId(banner)',this.getAdUnitId('banner'))
    return this.getAdUnitId('banner');
  }
}

export default new AdsService()