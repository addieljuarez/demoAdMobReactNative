import { Stack } from "expo-router"
import { useEffect } from "react"
import mobileAds from 'react-native-google-mobile-ads'
import { PremiumProvider } from './context/PremiumContext'

export default function RootLayout() {

  // Aqui inizializa los ads
  useEffect(() => {
    initializeAds();
  }, [])

  const initializeAds = async () => {
    try {
      await mobileAds().initialize();
      console.log('✅ AdMob initialized');
    } catch (error) {
      console.error('❌ AdMob initialization failed:', error);
    }
  }

  return (
    <PremiumProvider>
      <Stack />
    </PremiumProvider>
  )
}
