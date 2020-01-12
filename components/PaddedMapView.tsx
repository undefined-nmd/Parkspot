import React, { useRef } from 'react'
import { View, Text, StatusBar, Keyboard, TextInputSubmitEditingEventData, TouchableOpacity, StyleSheet, Picker, DatePickerIOS } from 'react-native'
import MapView from 'react-native-maps'

export default function PaddedMapView(props) {
    const EDGE_PADDING = {
        top: 0,
        right: 0,
        bottom: 200,
        left: 0
      }
      
    const mapRef = useRef(null)

    const fitToMarkers = () => {
        const markers = React.Children.map(
        props.children,
        child => child.props.coordinate
        )
        const options = {
        edgePadding: EDGE_PADDING,
        animated: false // optional
        }
        mapRef.current.fitToCoordinates(markers, options)
    }

    return (
        <MapView
        style={styles.map}
        ref={mapRef}
        onMapReady={fitToMarkers}
        >
            {props.children}
        </MapView>
    )
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
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
    }
})