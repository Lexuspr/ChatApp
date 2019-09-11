import React, { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, Platform, Keyboard, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../utils/Fire'

function Chat({ navigation }) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        Fire.shared.on(
            message => setMessages(
                prevMessages => GiftedChat.append(prevMessages, message)
            )
        )
        return () => {
            Fire.shared.off()
        };
    }, [])

    getUser = () => {
        return { 
            name: navigation.getParam('name'),
            _id: Fire.shared.uid
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <GiftedChat 
                    messages={messages}
                    onSend={Fire.shared.send}
                    user={getUser()}
                />
            {
                Platform.OS === 'android' ? <KeyboardSpacer topSpacing={20} /> : null
            }
            </View>
        </TouchableWithoutFeedback>
        
        
    )
}

Chat.navigationOptions = ({ navigation }) => {
  const name = navigation.getParam('name')
  return {
    title: name || 'Chat!'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'vincHand'
  }
})

export default Chat