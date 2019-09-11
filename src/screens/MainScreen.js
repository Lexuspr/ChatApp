import React, { useState } from 'react'

import { View, TextInput, Text, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Keyboard, Platform, StyleSheet } from 'react-native'

const offset = 24

function Main({ navigation }) {

  const [ name, setName ] = useState('')

  const TouchableComponent = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity

  const goToChat = () => {
    navigation.navigate('Chat', { name })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Ingresa tu nombre:</Text>
        <TextInput 
          style={styles.input}
          placeholder='John Cena'
          value={name}
          onChangeText={value => setName(value)}
        />
        <TouchableComponent onPress={goToChat}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableComponent>
      </View>
    </TouchableWithoutFeedback>
  )
}

Main.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Main Section'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
    fontFamily: 'vincHand',
  },
  input: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderRadius: 10,
    borderColor: '#111111',
    borderWidth: 1,
    fontFamily: 'vincHand',
    fontSize: offset
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
    fontFamily: 'vincHand',
  }
})

export default Main