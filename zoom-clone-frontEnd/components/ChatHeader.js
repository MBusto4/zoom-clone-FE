import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: 20,
            // paddingHorizontal: 10,
        },
        buttonText: {
            color: 'white',
            fontSize: 20
        },
        heading: {
            color: 'white',
            fontSize: 20,
            fontWeight: '700'
        }
    }
)

function ChatHeader({ setModalVisible }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
            </Pressable>
            <Text style={styles.heading}>Chat</Text>
            <Entypo name='bell' size={25} color='#efefef' />
        </View>
    )
}

export default ChatHeader