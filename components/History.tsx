import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Switch, ScrollView, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { Html5Entities } from 'html-entities'; 

export default function History(props) {    
    const [zone, setZone] = React.useState("City")
    const [scrollviewOffset, setOffset] = React.useState(0)
    const [historyResults, setHistory] = React.useState([])

    useEffect(() => {
        getSearchHistory()
    },[])

    const getSearchHistory = () => {
        getLSItem('History')
        .then((result) => {
            const searches = JSON.parse(result)
            console.log(searches)
            setHistory(searches)
        })
    }

    const setLSItem = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.log(error)
        }
    }

    const getLSItem = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value != null)
                return value
            else
                return 'empty'
        } catch (error) {
            console.log(error)
        }
    }

    const removeLSItem = (search: string) => {
        getLSItem('History')
        .then((result) => {
            let historyArray = []
            if(result) {
                historyArray = JSON.parse(result)
                let position = historyArray.indexOf(search);
                historyArray.splice(position, 1);
                setLSItem('History', JSON.stringify(historyArray))
                getSearchHistory()
            }
        })
    }

    const entities = new Html5Entities();
    return ( 
        <ScrollView style={styles.container} scrollEventThrottle={1} onScroll={(event) => setOffset(event.nativeEvent.contentOffset.y)}>
            <Text style={styles.heading}>History</Text>
            
            {historyResults.map((result, i) => {     
                return (
                <TouchableOpacity key={i} onPress={() => props.onPressSearch(result)} style={styles.listItemRowContainer}>
                    <Text style={styles.value} >{result}</Text>
                    <TouchableOpacity onPress={() => removeLSItem(result)}><Text style={styles.value} >{entities.decode('&#x2715')}</Text></TouchableOpacity>
                </TouchableOpacity>
                ) 
            })}

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
        marginBottom: 6,
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
        borderTopColor: "lightgray",
        borderTopWidth: 1
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
    },
    label: {
        width: '30%',
        fontSize: 16,
        fontWeight: '400',
    }
})