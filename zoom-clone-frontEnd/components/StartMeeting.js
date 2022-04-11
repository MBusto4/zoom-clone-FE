import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const styles = StyleSheet.create(
    {
        startMeetingContainer: {

        },
        info: {
            width: "100%",
            backgroundColor: "#373538",
            height: 50,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#484648',
            padding: 12,
            justifyContent: 'center',
        },
        textInput: {
            color: 'white',
            fontSize: 18,
        },
        startMeetingButton: {
            width: 350,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0470DC',
            height: 50,
            borderRadius: 15
        }
    }
)

function StartMeeting({ name, setName, room, setRoom, joinRoom }) {
    // console.log(joinRoom)

    return (
        <View style={styles.startMeetingContainer}>
            <View style={styles.info}>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    placeholder='Enter Name'
                    placeholderTextColor='#767476'
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.info}>
                <TextInput
                    placeholder='Enter Room ID'
                    placeholderTextColor='#767476'
                    style={styles.textInput}
                    value={room}
                    onChangeText={text => setRoom(text)}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => joinRoom()}
                    // onPress={() => console.log('button pressed')


                    style={styles.startMeetingButton}
                >
                    <Text
                        style={{ color: 'white', fontWeight: 'bold' }}>
                        Start Meeting
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default StartMeeting