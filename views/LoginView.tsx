import React from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import { useSelector, useDispatch } from 'react-redux'

export default function LoginView() {
	const { count } = useSelector(state => ({
		...state.countReducer,
	}))

    return (
        <View>
			<StatusBar barStyle="light-content"/>
            <Text>LoginView</Text>
			<Text>The button was pressed { count } times!</Text>
			<Image source={require('../assets/icons8-search.png')}/>
        </View>
    );
}

const navigationOptions: NavigationStackOptions = {
	title: 'Login',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

LoginView.navigationOptions  = navigationOptions
