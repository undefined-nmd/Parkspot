import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function SearchBar(props) {
    const [value, onChangeText] = React.useState();

    useEffect(() => {
        if(value === "") {
            props.onEmpty(value)
        }
    },[value])

    useEffect(() => {
        onChangeText(props.value)
    },[props.value])

    return (
        <View style={styles.container}>
            <Image style={{width: 22, height: 22}} source={require('../assets/icons8-search.png')}/>
            <TextInput
            value={value}
            onFocus={props.onFocus}
            returnKeyType={'done'}
            onSubmitEditing={event => props.onSubmit(event.nativeEvent)}
            autoCompleteType={"street-address"}
            clearButtonMode={'while-editing'}
            style={styles.textInput}
            onChangeText={text => onChangeText(text)}
            placeholder={"Address"}
            //value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#ebebeb',
        width: '93%',
        alignSelf: 'center'
    },
    textInput: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#ebebeb',
        opacity: 1.0,
        width: '90%',
        borderRadius: 12,
        textAlign: 'left',
        fontSize: 18,
        color: 'black',
    },
});
