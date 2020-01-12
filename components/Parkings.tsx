import React from 'react'
import { StyleSheet, Text, View, Dimensions, Linking, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

export default class Parkings extends React.Component{
    constructor(props) {
        super(props);
        this.state = {deviceWidth: Dimensions.get('window').width};
    }

    goToItem = (index) => {
        this._carousel.snapToItem(index, true, true)
    }

    openWaze = (address) => {
        try {
          address.replace(/\s/g, "%20");
          Linking.openURL("https://waze.com/ul?q=" + address)
        }
        catch(error) {
          console.log(error)
        }
      }
    renderItem = (item, index) => {
        let address = item.item.address.replace(/;.*;/, '')
        address = address.replace(", Belgium", '')
        address = address.replace(/;.*,/, ',')
        address = address.replace(/,.*,/, ',')
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.heading}>{item.item.name}</Text>
                        <Text>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.routeButton} onPress={() => openWaze(address)}>
                        <Image style={{width: 36, height: 43}} source={require('../assets/routeBtn.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.listItemContainer_normal}>
                    <View style={styles.listItemRowContainer}>
                        <Text style={styles.itemName} >Price</Text>
                        <Text style={styles.itemValue}>€{item.item.price.day}/hour</Text>
                    </View>
                </View>

                <View style={styles.listItemContainer_normal}>
                    <View style={styles.listItemRowContainer}>
                        <Text style={styles.itemName} >Type</Text>
                        <Text style={styles.itemValue}>{item.item.type}</Text>
                    </View>
                </View>

                <View style={styles.listItemContainer_normal}>
                    <View style={styles.listItemRowContainer}>
                        <Text style={styles.itemName} >Open</Text>
                        <Text style={styles.itemValue}>{item.item.open}</Text>
                    </View>
                </View>

                <View style={styles.listItemContainer_normal}>
                    <View style={styles.listItemRowContainer}>
                        <Text style={styles.itemName} >Free spot</Text>
                        <Text style={styles.itemValue}>{item.item.chance}% chance</Text>
                    </View>
                </View>
            </View>

        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                ref={(c) => { this._carousel = c; }}
                onSnapToItem={(index) => this.props.lookingAtParkingIndex(index)}
                data={this.props.items}
                renderItem={this.renderItem}
                sliderWidth={this.state.deviceWidth}
                itemWidth={this.state.deviceWidth*0.85}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4.27,
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        justifyContent: 'center',
        height: '30%',
        minHeight: 286,
        marginBottom: 10,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#3f3f3f',
    },
    view: {
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      text: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 10,
    
      },
      image: {
        width: 80,
        height: 80,
        marginRight: 10
      },
      listItemContainer_normal: {
        width:"100%",
        height:40,
        borderColor: 'rgba(112, 112, 112, 0.2)',
        borderTopWidth: 1,
    },
    listItemRowContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 20,
    },
    lastItemContainer: {
      width:"100%",
      height:40,
      borderColor: 'rgba(112, 112, 112, 0.2)',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginBottom: 30,
      padding: 0,
    },
    subtitle: {
      fontSize: 16,
      width: "80%",
      fontWeight: '500',
      color: '#484848',
      marginLeft: 20,
      marginBottom: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#484848',
      marginLeft: 20,
      marginTop: 10,
    },
    itemName: {
      fontWeight: '600',
    },
    routeButton: {
      flexDirection:"row", 
      backgroundColor: "#4CD964", 
      width: 60, 
      height: 60, 
      alignSelf:"center",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom:10,
      marginLeft:10,
      borderRadius: 10
    },
    itemValue: {
      marginRight:50,
    },
});
