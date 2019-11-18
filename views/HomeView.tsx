import React, { useRef, useEffect } from 'react'
import { View, Text, TextInput, StatusBar, Image, KeyboardAvoidingView, TextInputSubmitEditingEventData, TouchableOpacity } from 'react-native'
import { SyntheticEvent } from 'react'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView from 'react-native-maps'
import BottomDrawer from 'rn-bottom-drawer'
import Drawer from 'react-native-drawer'

export default function HomeView() {

    const [value, onChangeText] = React.useState();
    const drawerRef = useRef(null)

    const closeControlPanel = () => {
        drawerRef.current.close()
      };
    const openControlPanel = () => {
        drawerRef.current.open()
      };

    const handleTextSubmit = (event: TextInputSubmitEditingEventData) => {
        console.log(event.text)
        closeControlPanel()
    }

    useEffect(() => { 
    }, [])

    return (
        <Drawer
        ref={drawerRef}
        panThreshold={0.1}
        type={'overlay'}
        tweenDuration={240}
        openDrawerOffset={0.1}
        closedDrawerOffset={0.1}
        negotiatePan={true}
        side={'bottom'}
        styles={{borderRadius: 100,}}
        content={
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10,}}>
                <View
                style={{
                    width: 40,
                    height: 6,
                    margin: 8,
                    marginTop: 8,
                    borderRadius: 10,
                    backgroundColor: '#cfcfcf',
                    alignSelf: 'center',
                }}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#ebebeb', width: '93%', alignSelf: 'center'}}>
                        <Image style={{width: 22, height: 22}} source={require('../assets/icons8-search.png')}/>
                        <TextInput
                        onFocus={openControlPanel}
                        returnKeyType={'search'}
                        onSubmitEditing={(event) => handleTextSubmit(event.nativeEvent)}
                        autoCompleteType={"street-address"}
                        clearButtonMode={'while-editing'}
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
                        placeholder={"Address"}
                        value={value}
                        />
                    </View>
                <View style={{flex:1, width: '93%', alignSelf:'center', padding: 6, marginTop: 20}}>
                    <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>Preferences</Text>
                </View>
            </View>
        }
        >
            <View
            style={{ flex:1 }}
            >
                <StatusBar barStyle="dark-content"/>
                <MapView
                    style={{flex: 1,
                        width: '100%',
                        height: '100%',}}
                />
            </View>
        </Drawer>
    );
}

const navigationOptions: NavigationStackOptions = {
    header: null
  };

  HomeView.navigationOptions  = navigationOptions