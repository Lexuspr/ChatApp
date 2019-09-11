import React, { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, Platform, Keyboard, AppState, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../utils/Fire'

function Chat({ navigation }) {

    const [messages, setMessages] = useState([])
    const [appState, setAppState] = useState(AppState.currentState)

    _handleAppStateChange = nextAppState => {
        console.log(nextAppState)
        if (nextAppState.match(/inactive|background/)) {
            unsuscribe()
        } else if (nextAppState.match(/active/)) {
            getMessages()
        }
        setAppState(nextAppState)
      };

    unsuscribe = () => {
        setMessages([])
        Fire.shared.off()
    }

    getMessages = () => {
        Fire.shared.on(
            message => setMessages(
                prevMessages => GiftedChat.append(prevMessages, message)
            )
        )
    }

    useEffect(() => {
        getMessages()
        return () => {
            unsuscribe()
        };
    }, [])

    useEffect(() => {
        AppState.addEventListener('change', this._handleAppStateChange)
        return () => {
            AppState.removeEventListener('change', this._handleAppStateChange)
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