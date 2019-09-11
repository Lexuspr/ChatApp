import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import AppNavigator from './src/routes/AppNavigator'
import SolutionTimer from './src/utils/SolutionTimer'

function fetchFonts() {
  return Font.loadAsync({
    'vincHand': require('./assets/fonts/vincHand.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded ] = useState(false)
  
  return (
    !fontLoaded ?
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}/>
      :
      <View style={styles.container}>
        <AppNavigator />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
});
