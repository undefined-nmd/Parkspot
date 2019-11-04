import React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack';

import Count from '../components/count'

export default function MapView(props) {

    return (
        <View style={{flex: 1}}>
            <Text>MapView</Text>
            <Button
            title="Go to Details"
            onPress={() => props.navigation.navigate('Login')}
            />
            <Count/>
        </View>
    );
}

const navigationOptions: NavigationStackOptions = {
    header: null
  };

MapView.navigationOptions  = navigationOptions