import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function MovableIndicator() {

    return (
        <View
            style={styles.icon} />
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 5,
        margin: 8,
        marginTop: 8,
        borderRadius: 10,
        backgroundColor: '#cfcfcf',
        alignSelf: 'center',
    },
});
