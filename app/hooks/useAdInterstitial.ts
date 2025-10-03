import { useRef } from 'react'
import AdsServices from '../services/adsServices'

interface UseAdInterstitialOptions {
  enabled: boolean,
  actionThreshold?: number
}

export function useAdInterstitial ({enabled, actionThreshold = 5,}: UseAdInterstitialOptions) {
  console.log('actionThreshold', actionThreshold)
  const actionCountRef = useRef(0)
  console.log('actionCountRef 1', actionCountRef.current)

  const triggerAd = async (): Promise<void> => {
    console.log('entra el triggerAd')
    if(!enabled) return
    console.log('pasa el enabled')

    actionCountRef.current += 1
    console.log('actionCountRef 2', actionCountRef.current)

    // aqui muestra el anuncio interstital 
    await AdsServices.showInterstitial()

    // con este puedes controlar el numero de acciones para que lance el ad Interstitial
    // if(actionCountRef.current >= actionThreshold) {
    //   console.log('entra al if actionCountRef.current >= actionThreshold')
    //   const shown = await AdsServices.showInterstitial()
    //   if(shown) { 
    //     actionCountRef.current = 0;
    //   }
    // }
  }
  
  const resetCounter = () => {
    actionCountRef.current = 0
  }

  return {
    triggerAd,
    resetCounter
  }
}
