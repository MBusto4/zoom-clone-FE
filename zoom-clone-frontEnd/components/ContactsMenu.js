import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"


const styles = StyleSheet.create(
    {
        container: {

        },
        text: {
            color: 'white',
            paddingLeft: 15,
            fontSize: 18,
        },
        row: {
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center'
        },
        starredIcon: {
            backgroundColor: '#333333',
            width: 55,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
        },
        image: {
            width: 55,
            height: 55,
            borderRadius: 20,
        }
    })

const contactsMenuButtons = [
    {
        type: 'starred',
        name: 'Starred'
    },
    {
        type: 'contact',
        name: 'Sammy Sosa',
        photo: require('../assets/girl-blonde-haircartoon.jpeg')
    },
    {
        type: 'contact',
        name: 'Joey P',
        photo: require('../assets/male-avatar.jpeg')
    },
    {
        type: 'contact',
        name: 'Elon Musk',
        photo: require('../assets/elon-musk.jpeg')
    },
    {
        type: 'contact',
        name: 'Gary Vee',
        photo: require('../assets/gary-vee.jpeg')
    },
]

function ContactsMenu() {
    return (
        <View style={styles.container}>
            {contactsMenuButtons.map((button, index) => (
                <View
                    key={index}
                    style={styles.row}>
                    {/* Image */}
                    {button.type == 'starred' ? (
                        <View style={styles.starredIcon}>
                            <AntDesign name='star' size={30} color='#efefef' />
                        </View>
                    ) : (
                        <Image source={button.photo} style={styles.image} />
                    )}
                    {/* Text */}
                    <Text style={styles.text}>{button.name}</Text>
                </View>
            ))}
        </View>
    )
}

export default ContactsMenu