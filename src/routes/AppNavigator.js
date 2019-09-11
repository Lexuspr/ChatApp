import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Colors from '../constants/Colors'
import Main from '../screens/MainScreen'
import Chat from '../screens/ChatScreen'

const DefaultNavigationOptions = {
  initialRouteName : 'Main',
  defaultNavigationOptions : {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
      fontFamily: 'vincHand'
    },
    headerBackTitleStyle: {
      fontFamily: 'vincHand'            
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
}

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  Chat: {
    screen: Chat
  }
}, DefaultNavigationOptions)

export default createAppContainer(AppStackNavigator)

