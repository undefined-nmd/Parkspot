import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Switch, ScrollView, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import SnapSlider from 'react-native-snap-slider'

export default function Preferences(props) {
    
    const [zone, setZone] = React.useState("City")
    const [price, setPrice] = React.useState(0)
    const [distance, setDistance] = React.useState(100)
    const [bancontactAvailable, setBancontactAvailable] = React.useState(false)
    const [avoidLez, setAvoidLez] = React.useState(false)
    const [avoidUnderground, setAvoidUnderground] = React.useState(false)
    const [scrollviewOffset, setOffset] = React.useState(0)
    
    const PRICES = [
        {value: 1, label: "<€1"},
        {value: 2, label: "€2"},
        {value: 5, label: "€5"},
    ]
    const DISTANCES = [
        {value: 100, label: "<100m"},
        {value: 300, label: "300m"},
        {value: 700, label: "700m"},
        {value: 1000, label: ">1km"},
    ]

    useEffect(() => {
        if(scrollviewOffset === 0) {
            props.onScrollviewAtStart(false)
        } else {
            props.onScrollviewAtStart(true)
        }
    },[scrollviewOffset])

    const setLSItem = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.log(error)
        }
    }

    const getLSItem = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value != null)
                return value
            else
                return false
        } catch (error) {
            console.log(error)
        }
    }

    const addSearchToHistory = () => {
        getLSItem('History')
        .then((result) => {
            let historyArray = []
            if(result) {
                historyArray = JSON.parse(result)
                if(!historyArray.includes(props.destinationAddress)) {
                    if(historyArray.length >= 5)
                        historyArray.pop()
                    historyArray.unshift(props.destinationAddress) 
                    setLSItem('History', JSON.stringify(historyArray))
                }
            } else {
                historyArray.push(props.destinationAddress)
                setLSItem('History', JSON.stringify(historyArray))
            }
        })
    }

    const handlePreferencesSubmit = async() => {
        addSearchToHistory()

        let data = {
            "destinationGeo": {
                "long": props.region.longitude,
                "lat": props.region.latitude
            },
            "userId": "",
            "settings": {
                "zonename": zone,
                "price_per_hour" : price,
                "distance_from_destination" : distance,
                "bankcontact" : bancontactAvailable,
                "low_emission_zone" : avoidLez,
                "underground" : !avoidUnderground
            }
        }

        fetch("http://192.168.5.136:8080/api/v1/searchparkingspots",
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((responseJson)=> {
            props.setResults(responseJson)
        })
        .catch(error=>console.log(error)) 
        props.closeDrawer()
    }

    return ( 
        <ScrollView style={styles.container} scrollEventThrottle={1} onScroll={(event) => setOffset(event.nativeEvent.contentOffset.y)}>
            <Text style={styles.heading}>Preferences</Text>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Zone</Text>
                <TouchableOpacity onPress={() => props.showPicker(zone, setZone)}><Text style={styles.value}>{zone} </Text></TouchableOpacity>
            </View>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Price/hour</Text>
                <SnapSlider style={{width: 200, height: 40}}
                    itemWrapperStyle={{padding: 0}}
                    items={PRICES}
                    labelPosition="top"
                    defaultItem={0}
                    onSlidingComplete={(value) => setPrice(PRICES[value].value)}/>
            </View>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Distance from destination</Text>
                <SnapSlider style={{width: 200, height: 40}}
                    itemWrapperStyle={{padding: 0}}
                    items={DISTANCES}
                    labelPosition="top"
                    defaultItem={0}
                    onSlidingComplete={(value) => setDistance(DISTANCES[value].value)}/>
            </View>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Bancontact</Text>
                <Switch trackColor={{true: '#30d158', false:'none'}} onValueChange={(value) => setBancontactAvailable(value)} value={bancontactAvailable} />
            </View>

            <Text style={styles.subHeading}>Avoid</Text>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Low Emission Zone</Text>
                <Switch trackColor={{true: '#30d158', false:'none'}} onValueChange={(value) => setAvoidLez(value)} value={avoidLez} />
            </View>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Underground parking</Text>
                <Switch trackColor={{true: '#30d158', false:'none'}} onValueChange={(value) => setAvoidUnderground(value)} value={avoidUnderground} />
            </View>

            <TouchableOpacity style={styles.rectangleButtonContainer} onPress={() => handlePreferencesSubmit()}>
                        <Text style={styles.text}> Search </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    rectangleButtonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginBottom: 200,
        backgroundColor: '#30d158',
        height: 50,
        marginTop: 20,
        borderRadius: 7,
    },
    text: {
        color: "#FFF",
        fontSize: 24,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#3f3f3f',
        marginTop: 20,
    },
    subHeading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#3f3f3f',
        marginTop: 20,
    },
    listItemRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: "#007FFF",
    },
    label: {
        width: '30%',
        fontSize: 16,
        fontWeight: '400',
    }
})