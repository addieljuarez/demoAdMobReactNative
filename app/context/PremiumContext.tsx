import { createContext, ReactNode, useContext, useEffect, useState } from "react"
interface PremiunContextType {
  isPremium: boolean
  shouldShowAds: () => boolean
  upgradeToPremium: () => Promise<void>
}

const PremiumContext = createContext<PremiunContextType | undefined>(undefined)

export function PremiumProvider({children}: {children: ReactNode}){
  const [isPremium, setIsPremium] = useState(false)
  useEffect(() => {
    checkPremiumStatus()
  }, [])
  const checkPremiumStatus = async () => {
    // aqui revisas en tu storage si es premium
    setIsPremium(false)
  }

  const upgradeToPremium = async () => {
    // aqui va lo logica de IAP cuando cambia a premium
    setIsPremium(true)
  }

  const shouldShowAds = (): boolean => {
    return !isPremium
  }

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        shouldShowAds,
        upgradeToPremium,        
      }}
    >
      {children}
    </PremiumContext.Provider>
  )
}

export const usePremium = () => {
  const context = useContext(PremiumContext)
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider')
  }
  return context
}