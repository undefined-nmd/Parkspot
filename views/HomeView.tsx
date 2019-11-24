import React, { useRef, useEffect } from 'react'
import { View, Text, StatusBar, Keyboard, TextInputSubmitEditingEventData, TouchableOpacity, StyleSheet, Picker, DatePickerIOS } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView from 'react-native-maps'
import Drawer from 'react-native-drawer'
import QuickPicker from 'quick-picker'
import Constants from 'expo-constants'

// Own Components
import SearchBar from '../components/SearchBar'
import MovableIndicator from '../components/MovableIndicator'
import Preferences from '../components/Preferences'

export default function HomeView() {

    const [drawerContent, setDrawerContent] = React.useState( <Text style={styles.heading}>History</Text>)
    const [drawerDisabled, setDrawerDisabled] = React.useState(false)
    const ZONES = ['City', 'Edge of city', 'Outside city', 'Park & Ride']
    const drawerRef = useRef(null)
    let closedDrawerOffset = 0.106

    const closeControlPanel = () => {
        Keyboard.dismiss()
        drawerRef.current.close()
      };
    const openControlPanel = () => {
        drawerRef.current.open()
    }

    const showPicker = (zone: string, setZone: React.Dispatch<React.SetStateAction<string>>) => {
        Keyboard.dismiss()
        QuickPicker.open({ 
            items: ZONES,
            selectedValue: zone, // this could be this.state.selectedLetter as well.
            onValueChange: (selectedValueFromPicker: string) => setZone(selectedValueFromPicker),
        });
    }

    const handleTextSubmit = (event: TextInputSubmitEditingEventData) => {
        if(event.text != "") {
            setDrawerContent(<Preferences onScrollviewAtStart={setDrawerDisabled} showPicker={showPicker} closeDrawer={closeControlPanel} />)
            console.log(event.text)
        }
    }

    const handleEmptyTextInput = () => {
        setDrawerContent(<Text style={styles.heading}>History</Text>)
    }

    return (
        <View style={{flex:1}}>
            <Drawer
            ref={drawerRef}
            disabled={drawerDisabled}
            onCloseStart={() => Keyboard.dismiss()}
            panThreshold={0.1}
            type={'overlay'}
            tweenDuration={280}
            openDrawerOffset={0.05}
            closedDrawerOffset={closedDrawerOffset}
            negotiatePan={true}
            useInteractionManager={true}
            side={'bottom'}
            content={
                <View style={styles.drawer}>
                    <MovableIndicator/>
                    <SearchBar onFocus={openControlPanel} onSubmit={handleTextSubmit} onEmpty={handleEmptyTextInput} />
                    <View style={styles.drawerContentContainer}>
                        {drawerContent}
                    </View>
                </View>
            }
            >
                <View style={{ flex:1 }} >
                    <StatusBar barStyle="dark-content"/>
                    <MapView style={styles.map} />
                </View>
            </Drawer>
            <QuickPicker/>
        </View>
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
    },
    drawer: {
        flex: 1, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4.27,
        elevation: 10,
    },
    drawerContentContainer: {
        flex:1,
        width: '93%',
        alignSelf:'center',
        padding: 6,
        marginTop: 4
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#3f3f3f',
        marginTop: 20
    },
    listItemRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0,
    },
    value: {
        color: "#007FFF",
    },
})

const navigationOptions: NavigationStackOptions = {
    header: null
}

HomeView.navigationOptions  = navigationOptions