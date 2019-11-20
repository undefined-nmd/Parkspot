import React, { useRef, useEffect } from 'react'
import { View, Text, TextInput, StatusBar, Image, Keyboard, TextInputSubmitEditingEventData, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView from 'react-native-maps'
import Drawer from 'react-native-drawer'

export default function HomeView() {

    const [value, onChangeText] = React.useState();
    const [drawerContent, setDrawerContent] = React.useState( <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>History</Text>);
    const drawerRef = useRef(null)

    const closeControlPanel = () => {
        Keyboard.dismiss()
        drawerRef.current.close()
      };
    const openControlPanel = () => {
        setDrawerContent(<Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>History</Text>)
        drawerRef.current.open()
      };

    const handleTextSubmit = (event: TextInputSubmitEditingEventData) => {
        setDrawerContent(
        <View style={{flex:1}}>
            <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>Preferences</Text>
            <TouchableOpacity style={styles.rectangleButtonContainer} onPress={() => closeControlPanel()}>
                        <Text style={styles.text}> Search </Text>
            </TouchableOpacity>
        </View>)
        console.log(event.text)
    }

    return (
        <Drawer
        ref={drawerRef}
        onCloseStart={() => Keyboard.dismiss()}
        panThreshold={0.1}
        type={'overlay'}
        tweenDuration={250}
        openDrawerOffset={0.05}
        closedDrawerOffset={0.1}
        negotiatePan={true}
        side={'bottom'}
        content={
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.24,
            shadowRadius: 4.27,
            
            elevation: 10,}}>
                <View
                style={{
                    width: 40,
                    height: 5,
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
                    {drawerContent}
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

const styles = StyleSheet.create({
    rectangleButtonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginBottom: 200,
        backgroundColor: '#48ed39',
        height: 50,
        marginTop: 20,
        borderRadius: 7,
    },
    text: {
        color: "#FFF",
        fontSize: 24,
    }
});

const navigationOptions: NavigationStackOptions = {
    header: null
  };

  HomeView.navigationOptions  = navigationOptions