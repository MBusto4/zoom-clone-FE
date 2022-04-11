import React, { useContext, useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { MainContext } from '../mainContext'
import { SocketContext } from '../socketContext'
import { useToast } from "@chakra-ui/react"
import { UsersContext } from '../usersContext'
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom } = useContext(MainContext)
    // const history = useHistory()
    const toast = useToast()
    const { setUsers } = useContext(UsersContext)

    //Checks to see if there's a user already present

    useEffect(() => {
        socket.on("users", users => {
            setUsers(users)
        })
    })

    //Emits the login event and if successful redirects to chat and saves user data
    const handleClick = () => {
        socket.emit('login', { name, room }, error => {
            if (error) {
                console.log(error)
                return toast({
                    position: "top",
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
            // history.push('/chat')
            navigation.navigate("Home")
            return toast({
                position: "top",
                title: "Hey there",
                description: `Welcome to ${room}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Namer"
                    placeholderTextColor="#003f5c"
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Room"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(room) => setRoom(room)}
                />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => handleClick()}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});

export default Login