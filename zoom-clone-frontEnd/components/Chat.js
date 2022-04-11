import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, StyleSheet, TextInput, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native'
import ChatHeader from './ChatHeader'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { io } from 'socket.io-client'
import { UsersContext } from '../usersContext'
import { MainContext } from '../mainContext'
import { SocketContext } from '../socketContext'


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#1c1c1c'
        },
        chatMessages: {
            flex: 1
        },
        chatFormContainer: {
            borderColor: '#2f2f2f',
            borderTopWidth: 1,
            padding: 12
        },
        textInput: {
            height: 40,
            color: '#efefef',
            borderColor: '#595859',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 12,
            flex: 1
        },
        button: {
            height: 40,
            width: 40,
            marginTop: 12,
            marginLeft: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        chatForm: {
            flexDirection: 'row',
        }
    }
)

function Chat({ setModalVisible, name, room }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    //using ngrok here thats what this endpoint is
    // const ENDPOINT = "http://a346-24-60-104-75.ngrok.io";
    /*
        this endpoint is the IP address of ur network...right click on apple icon top left...system preferences..go to network...
        and copy and paste the IP address but leave the :3333
    */
    const ENDPOINT = "http://192.168.1.7:3333";
    let socket = io(ENDPOINT);
    // const socket = useContext(SocketContext)
    // const { name, room, setName, setRoom } = useContext(MainContext)


    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    const handleSubmit = () => {
        socket.emit("sendMessage", { message });
        // socket.emit("sendMessage", {
        //     user: name,
        //     text: message
        // });
        setMessage("");
        setMessages((messages) => [...messages, message]);
        // setMessages([...messages, message]);
        console.log('message sent-->', message)
        console.log('all messages-->', messages)
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: '100%' }}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={{ flex: 1 }}>
                        <ChatHeader setModalVisible={setModalVisible} />
                        <View style={styles.chatMessages}>
                            {messages.length > 0 ?
                                messages.map((msg, i) => (
                                    <View key={i}>
                                        <Text style={{ color: 'white' }}>{msg.user} - {msg.text}</Text>
                                        <Text style={{ color: 'white' }}>{name} - {msg}</Text>
                                    </View>
                                )) : (
                                    <View >
                                        <Text style={{ color: 'white' }}>There are no Messages</Text>
                                    </View>
                                )}
                            {/* {messages.map((msg, i) => (
                                <View key={i}>
                                    <Text style={{ color: 'white' }}>{msg.name} - {msg.text}</Text>
                                    <Text style={{ color: 'white' }}>{name} - {msg}</Text>
                                </View>
                            ))} */}
                        </View>
                        <View style={styles.chatFormContainer}>
                            <Text style={{ color: 'white' }}>Send to: Everyone</Text>
                            <View style={styles.chatForm}>
                                <TextInput
                                    value={message}
                                    onChangeText={text => (setMessage(text))}
                                    placeholder='Tap here to Chat'
                                    placeholderTextColor='#595859'
                                    style={styles.textInput}
                                />
                                <TouchableOpacity style={
                                    {
                                        ...styles.button,
                                        backgroundColor: message ? '#0B71EB' : "#373838",

                                    }}
                                    onPress={() => handleSubmit()}
                                >
                                    <FontAwesome name='send' size={18} color={'#efefef'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView >
        </View >
    )
}

export default Chat