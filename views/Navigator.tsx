import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapView from './MapView'
import LoginView from './LoginView'

export default function Navigator() {

    const AppNavigator = createStackNavigator(
        {
            Home: {
            screen: MapView,
            },
            Login: {
                screen: LoginView,
            },
        },
        {
            initialRouteName: 'Home',
        },
    );

    const AppContainer = createAppContainer(AppNavigator);
      
    return(
        <AppContainer/>
    );
}
