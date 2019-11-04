import React from 'react'
import { View, Text } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'

export default function LoginView() {

    return (
        <View>
            <Text>LoginView</Text>
        </View>
    );
}

const navigationOptions: NavigationStackOptions = {
	title: 'Login',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

LoginView.navigationOptions  = navigationOptions
