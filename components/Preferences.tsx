import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function Preferences(props) {
    
    const [zone, setZone] = React.useState("City");

    return ( 
        <View style={styles.container}>
            <Text style={styles.heading}>Preferences</Text>

            <View style={styles.listItemRowContainer}>
                <Text style={styles.label} >Zone</Text>
                <TouchableOpacity onPress={() => props.showPicker(zone, setZone)}><Text style={styles.value}>{zone} </Text></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.rectangleButtonContainer} onPress={() => props.closeDrawer()}>
                        <Text style={styles.text}> Search </Text>
            </TouchableOpacity>
        </View>
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
        backgroundColor: '#48ed39',
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
        color: '#3f3f3f'
    },
    listItemRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: "#007FFF",
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
    }
})