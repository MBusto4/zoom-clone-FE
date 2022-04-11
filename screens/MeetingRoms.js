import React, { useState, useEffect, useRef } from 'react'
import queryString from "query-string";
import { Modal, View, StyleSheet, TextInput, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import StartMeeting from '../components/StartMeeting'
import { io } from 'socket.io-client'
import { Camera } from 'expo-camera'
import { Alert } from 'react-native-web'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Chat from '../components/Chat'

let socket

const menuIcons = [
    {
        id: 1,
        name: 'microphone',
        title: "Mute",
        customColor: '#efefef'
    },
    {
        id: 2,
        name: 'video-camera',
        title: "Stop Video",
        customColor: '#efefef'
    },
    {
        id: 3,
        name: 'upload',
        title: "Share Content",
        customColor: '#efefef'
    },
    {
        id: 4,
        name: 'group',
        title: "Participants",
        customColor: '#efefef'
    },
]

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'black',
            flex: 1
        },
        footerMenu: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#1c1c1c',
        },
        iconText: {
            color: '#efefef',
            marginTop: 10,
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            marginTop: 15,
            marginBottom: 10
        },
        cameraContainer: {
            // backgroundColor: 'black'
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        activerUserContainer: {
            borderColor: 'gray',
            borderWidth: 1,
            width: 200,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center'
        },
        activeUsers: {
            flex: 1,
            justifyContent: 'center',
        }
    }
)

function MeetingRoms() {

    const [name, setName] = useState('')
    // const [roomId, setRoomId] = useState()
    const [room, setRoom] = useState('')
    const [activeUsers, setActiveUsers] = useState([])
    const [startCamera, setStartCamera] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    /*
    this endpoint is the IP address of ur network...right click on apple icon top left...system preferences..go to network...
    and copy and paste the IP address but leave the :3333
*/
    const ENDPOINT = "http://192.168.1.7:3333";
    //using ngrok here thats what this endpoint is
    // const ENDPOINT = "http://a346-24-60-104-75.ngrok.io";


    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert("Access Denied!")
        }
    }

    const joinRoom = () => {
        openCamera()
        socket.emit('join-room', {
            room: room,
            userName: name
        })
        console.log('joined room')
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on('connection', () => console.log('connected'))
        socket.on('all-users', users => {
            setActiveUsers(users)
            console.log("Active Users--->", users)
        })
    }, [])

    {/* transmit video data to multiple devices with react-native is someone limited... RTC? */ }
    return (
        <View style={styles.container}>

            {startCamera ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <Modal
                        animationType='slide'
                        transparent={false}
                        presentationStyle={"fullScreen"}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Chat Modal has been closed.")
                            setModalVisible(!modalVisible)
                        }}
                    >
                        {/* <Chat modalVisible={modalVisible} setModalVisible={setModalVisible} name={name} roomId={roomId} /> */}
                        <Chat modalVisible={modalVisible} setModalVisible={setModalVisible} name={name} room={room} activeUsers={activeUsers} />

                    </Modal>

                    {/* Active Users Section */}
                    <View style={styles.activeUsers}>
                        <View style={styles.cameraContainer}>
                            <Camera
                                type={"front"}
                                style={{
                                    width: activeUsers.length <= 1 ? '100%' : 200,
                                    height: activeUsers.length <= 1 ? 550 : 250
                                }}
                            >
                            </Camera>
                            {activeUsers.filter((user) => (user.userName !== name)).map((user, index) => (
                                <View key={index} style={styles.activerUserContainer}>
                                    <Text style={{ color: 'white' }}>{user.userName}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.footerMenu}>
                        {menuIcons.map((icon, index) => (
                            <TouchableOpacity key={index} style={styles.iconContainer}>
                                <FontAwesome name={icon.name} size={24} color={'#efefef'} />
                                <Text style={styles.iconText}>{icon.title}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={styles.iconContainer}>
                            <FontAwesome name={"comment"} size={24} color={'#efefef'} />
                            <Text style={styles.iconText}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            ) : (
                <StartMeeting
                    name={name}
                    setName={setName}
                    room={room}
                    setRoom={setRoom}
                    joinRoom={joinRoom}
                />
            )}
        </View>
    )
}

export default MeetingRoms