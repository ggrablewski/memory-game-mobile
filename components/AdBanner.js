import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import mobileAds, { BannerAd, BannerAdSize, TestIds, MaxAdContentRating } from 'react-native-google-mobile-ads';

const AdBanner = () => {
  // W trybie development używamy testowych ID
  // W produkcji użyj prawdziwych ID z Google AdMob
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : Platform.select({
        // TODO: Zamień na prawdziwe Ad Unit IDs z Google AdMob
        android: 'ca-app-pub-7525157017754869/2769458160',
        ios: 'ca-app-pub-7525157017754869/1320645123',
      });

async function initAds() {
  await mobileAds().setRequestConfiguration({
    tagForChildDirectedTreatment: true,
    maxAdContentRating: MaxAdContentRating.G,
  });

  await mobileAds().initialize();
}

initAds();

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // GDPR compliance
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdBanner;
