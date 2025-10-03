import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import AdsService from '../services/adsServices';


export default function AdBanner () {
  return (
    <View style={Styles.viewContainer}>
      <BannerAd
        unitId={AdsService.getBannerAdUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
        onAdLoaded={() => {
          console.log('✅ Banner ad loaded')
        }}
        onAdFailedToLoad={(error) => {
          console.error('❌ Banner ad failed:', error)
        }}
        onPaid={(event) => {
          console.log('💰 Ad paid:', event)
        }}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: 50
  }
})