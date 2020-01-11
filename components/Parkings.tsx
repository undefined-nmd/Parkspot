import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

export default function Parkings(props) {
    const [parkings, setParkings] = React.useState([{title: "parking 1"}, {title: "parking 2"}]);
    const deviceWidth = Dimensions.get('window').width

    const renderItem = (item, index) => {
        return (
            <View style={styles.card}>
                <Text style={styles.heading}>{ item.item.title }</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Carousel
            data={parkings}
            renderItem={renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth*0.85}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4.27,
        elevation: 10,
    },
    container: {
        justifyContent: 'center',
        height: '30%',
        minHeight: 200,
        marginBottom: 10,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#3f3f3f',
    },
});
