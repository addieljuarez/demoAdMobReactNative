import { View } from "react-native";
import AdBanner from './components/AdBanner';
import { usePremium } from './context/PremiumContext';
import { useAdInterstitial } from './hooks/useAdInterstitial';

export default function Index() {

  const { shouldShowAds } = usePremium()

  // hook para manejar interstitial

  const { triggerAd } = useAdInterstitial({
    enabled: shouldShowAds(),
    actionThreshold: 5
  })

  setTimeout(() => {
    triggerAd()
    
    console.log('entra el timeout')
  }, 10000)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {shouldShowAds()}
      <AdBanner />
    </View>
  );
}
