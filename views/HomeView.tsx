import React, { useRef, useEffect } from 'react'
import { View, Text, StatusBar, Keyboard, TextInputSubmitEditingEventData, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView from 'react-native-maps'
import Drawer from 'react-native-drawer'

// Own Components
import SearchBar from '../components/SearchBar'
import MovableIndicator from '../components/MovableIndicator'

export default function HomeView() {

    const [drawerContent, setDrawerContent] = React.useState( <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>History</Text>);
    const drawerRef = useRef(null)

    const closeControlPanel = () => {
        Keyboard.dismiss()
        drawerRef.current.close()
      };
    const openControlPanel = () => {
        drawerRef.current.open()
      };

    const handleTextSubmit = (event: TextInputSubmitEditingEventData) => {
        if(event.text != "") {
            setDrawerContent(
                <View style={{flex:1}}>
                    <Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>Preferences</Text>
                    <TouchableOpacity style={styles.rectangleButtonContainer} onPress={() => closeControlPanel()}>
                                <Text style={styles.text}> Search </Text>
                    </TouchableOpacity>
                </View>)
            console.log(event.text)
        }
    }

    const handleEmptyTextInput = () => {
        setDrawerContent(<Text style={{fontSize: 26, fontWeight: '700', color: '#3f3f3f'}}>History</Text>)
    }

    return (
        <Drawer
        ref={drawerRef}
        onCloseStart={() => Keyboard.dismiss()}
        panThreshold={0.1}
        type={'overlay'}
        tweenDuration={280}
        openDrawerOffset={0.05}
        closedDrawerOffset={0.1}
        negotiatePan={true}
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
        marginTop: 20
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

const navigationOptions: NavigationStackOptions = {
    header: null
  };

  HomeView.navigationOptions  = navigationOptions