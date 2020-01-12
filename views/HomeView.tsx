import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StatusBar, Keyboard, TextInputSubmitEditingEventData, TouchableOpacity, StyleSheet, Picker, DatePickerIOS } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'
import MapView, { Marker } from 'react-native-maps'
import Drawer from 'react-native-drawer'
import QuickPicker from 'quick-picker'

// Own Components
import SearchBar from '../components/SearchBar'
import MovableIndicator from '../components/MovableIndicator'
import Preferences from '../components/Preferences'
import Parkings from '../components/Parkings'
import History from '../components/History'

export default function HomeView() {

    const [content, setContent] = React.useState()
    const [parkingIndex, setParkingIndex] = React.useState(0)
    const [markers, setMarkers] = React.useState([])
    const [destinationMarker, setDestinationMarker] = useState()
    const [parkings, setParkings] = React.useState([])
    const [drawerDisabled, setDrawerDisabled] = React.useState(false)
    const [pressedIndex, setPressedId] = React.useState(false)
    const [destinationAddress, setDestinationAddress] = React.useState(null)
    const [region, setRegion] = React.useState({
        latitude: 51.0543422,
        longitude: 3.7274243,
        latitudeDelta: 0.122,
        longitudeDelta: 0.0321,
      })
    
    const ZONES = ['City', 'Edge of city', 'Outside city', 'Park & Ride']
    const drawerRef = useRef(null)
    const mapRef = useRef(null)
    const carouselRef = useRef(null)
    let closedDrawerOffset = 0.106

    useEffect(() => {
        if(destinationAddress != null) {
            getCoordinatesAndFocusMap(destinationAddress)
        }
        return
    },[destinationAddress])

    useEffect(() => {
        if(parkings.length > 0)
            mapRef.current.fitToElements(true)
        return
    },[markers])

    useEffect(() => {
        if(pressedIndex) {
            carouselRef.current.goToItem(pressedIndex)
        }
        return
    },[pressedIndex])

    const getCoordinatesAndFocusMap = (address: string) => {
        fetch(`https://roadreport.osoc.be//best@/search?text=${address}`)
        .then(response => response.json())
        .then(data => {
            setRegion({
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0],
                latitudeDelta: 0.022,
                longitudeDelta: 0.0221,
            })
            let coordinates = {
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0],
              }

            setDestinationMarker(<Marker image={require('../assets/redMarker.png')} coordinate={coordinates}/>)
        })
        .catch(error => {
            return error
        })
    }

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
            selectedValue: zone,
            onValueChange: (selectedValueFromPicker: string) => setZone(selectedValueFromPicker),
        });
    }

    const changeMarkers = (index) => {
        let markersArray = []
        parkings.forEach(parking => {
            if(parking) {
                markersArray.push({
                    latitude: parking.coordinates.lat,
                    longitude: parking.coordinates.long
                })
            }
        })
        setMarkers(markersArray)
        fitToMarkers()
    }

    const handleApiResults = (data) => {
        setParkings(data)
    }

    const fitToMarkers = () => {
        mapRef.current.fitToElements(true)
    }

    useEffect(() => {
        if(parkings.length) {
            setContent(<Parkings ref={carouselRef} pressedIndex={pressedIndex} markers={markers} lookingAtParkingIndex={setParkingIndex} setMarkers={setMarkers} items={parkings}/>)
            changeMarkers(parkingIndex)
            fitToMarkers()
            
        } else
            setContent([])
        return
    }, [parkings])

    const handleTextSubmit = (search: string) => {
        if(search != "") {
            setDrawerContent(<Preferences setResults={(data) => handleApiResults(data)} onScrollviewAtStart={setDrawerDisabled} destinationAddress={search} region={region} showPicker={showPicker} closeDrawer={closeControlPanel} />)
        }
        setDestinationAddress(search)
    }

    const handleEmptyTextInput = () => {
        setDrawerDisabled(false)
        setDestinationAddress("")
        setMarkers([])
        setDrawerContent(<History onScrollviewAtStart={setDrawerDisabled} onPressSearch={handleTextSubmit}/>)
        setContent(null)
    }

    const [drawerContent, setDrawerContent] = React.useState( <History onScrollviewAtStart={setDrawerDisabled} onPressSearch={handleTextSubmit}/>)

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
                    <SearchBar onFocus={openControlPanel} value={destinationAddress} onSubmit={(e: TextInputSubmitEditingEventData) => handleTextSubmit(e.text)} onEmpty={handleEmptyTextInput} />
                    <View style={styles.drawerContentContainer}>
                        {drawerContent}
                    </View>
                </View>
            }
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                    <StatusBar barStyle="dark-content"/>
                    <MapView provider={'google'} style={styles.map2} region={region} ref={mapRef} mapPadding={{ top: 80, right: 10, bottom: 320, left: 10 }}>
                    {destinationMarker}
                    {markers.map((result, i) => {     
                        return (
                        <Marker onPress={(e) => setPressedId(e.nativeEvent.id)} image={require('../assets/blueMarker.png')}  identifier={i.toString()} key={i} coordinate={result}/>
                        ) 
                    })}
                    </MapView>
                    {content}
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
            height: -5,
        },
        shadowOpacity: 0.08,
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
    map2: {
        position: 'absolute',
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