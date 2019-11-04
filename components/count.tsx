import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function Count() {

  const { count } = useSelector(state => ({
      ...state.countReducer,
  }))
  const dispatch = useDispatch()

  const incrementCounter = () => {
    dispatch({
        type: "INCREMENT_COUNT",
    })
  }

  return (
    <View style={styles.container}>
        <Text>You pressed {count} times!</Text>
        <Button title={"PRESS IT"} onPress={incrementCounter}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
