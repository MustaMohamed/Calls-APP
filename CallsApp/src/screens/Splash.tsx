import React, { FC } from 'react';
import { View } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';

import requireAuth from '../utils/require-auth.hoc';

const SplashScreen = (): FC =>
  (<View style={styles.container}>
    <ImageBackground source={require('../assets/images/splash.png')} style={styles.backgroundImage}/>
  </View>);

export default requireAuth(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});
