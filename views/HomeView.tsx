import React from 'react'
import { View, Text, TextInput, StatusBar, Image, KeyboardAvoidingView } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView from 'react-native-maps'
import BottomDrawer from 'rn-bottom-drawer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function HomeView(props) {

    const [value, onChangeText] = React.useState();

    return (
        <View
        style={{ flex:1 }}
        >
            <StatusBar barStyle="dark-content"/>
            <MapView
				style={{flex: 1,
                    width: '100%',
                    height: '100%',}}
			/>
            <KeyboardAvoidingView style={{width: '100%', padding: 6, bottom: 40, justifyContent: 'center', alignItems: 'center', position: "absolute",alignSelf: 'center', backgroundColor: 'white', zIndex: 2}} behavior="padding" enabled keyboardVerticalOffset={6}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#ebebeb', width: '93%', alignSelf: 'center'}}>
                    <Image style={{width: 22, height: 22}} source={require('../assets/icons8-search.png')}/>
                    <TextInput
                    style={{
                        alignSelf: 'center',
                        padding: 10,
                        backgroundColor: '#ebebeb',
                        opacity: 1.0,
                        width: '90%',
                        borderRadius: 12,
                        textAlign: 'left',
                        fontSize: 18,
                        color: 'black',
                    }}
                    onChangeText={text => onChangeText(text)}
                    placeholder={"Adress"}
                    value={value}
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{width: '100%', backgroundColor: 'white', bottom: 0, height: 60, zIndex: 1}}></View>
            <BottomDrawer
            containerHeight={400}
            downDisplay={290}
            backgroundColor={"#FFF"}
            shadow={false}
            startUp={false}
            >
                <View
                style={{
                    width: 40,
                    height: 6,
                    margin: 4,
                    marginTop: 8,
                    borderRadius: 10,
                    backgroundColor: '#cfcfcf',
                    alignSelf: 'center',
                }}
                />
                <View style={{flex:1, width: '93%', alignSelf:'center', padding: 6}}>
                    <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>Favorieten</Text>
                </View>
            </BottomDrawer>
        </View>
    );
}

const navigationOptions: NavigationStackOptions = {
    header: null
  };

  HomeView.navigationOptions  = navigationOptions