# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

![til](https://github.com/addieljuarez/demoAdMobReactNative/blob/main/demoAd.gif)

# This demo is to correctly run Google Ads banners and interstitials

## Get started

1. create Account

   ```
   https://admob.google.com/
   create unit banner and unit interstital
   ```


2. change AppId in app.json 

   ```bash
   "androidAppId": "ca-app-pub-XXXXXXXX~XXXXXXXX",
   "iosAppId": "ca-app-pub-XXXXXXXX~XXXXXXXX",
   ```


3. In app/services/adsServices change adsId to yours ID

   ```bash
   const AD_UNIT_IDS = {
      banner: {
         ios: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
         android: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
      },
      interstitial: {
         ios: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
         android: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-XXXXXXXX/XXXXXXXX',
      },
   };
   ```

4. install dependencies

   ```bash
   npm install

5. prebuild expo

   ```bash
   npx expo prebuild
   ```

6. Start the app

   ```bash
   npx expo run:ios
   npx expo run:android
   ```

