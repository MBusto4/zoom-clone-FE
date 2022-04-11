import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"

const styles = StyleSheet.create(
    {
        container: {
            marginTop: 25,
            paddingBottom: 10,
            borderBottomColor: '#1F1F1F',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        buttonContainer: {
            alignItems: 'center',
            flex: 1

        },
        menuText: {
            color: '#858585',
            fontSize: 12,
            paddingTop: 10,
            fontWeight: '600'
        },
        button: {
            width: 50,
            height: 50,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)

const buttons = [
    {
        id: 1,
        name: "video-camera",
        title: 'New Meeting',
        customColor: '#FF751F'
    },
    {
        id: 2,
        name: "plus-square",
        title: 'Join',
    },
    {
        id: 3,
        name: "calendar",
        title: 'Schedule',
    },
    {
        id: 4,
        name: "upload",
        title: 'Share Screen',
    },
]


function MenuButtons({ navigation }) {

    const openMeeting = () => {
        navigation.navigate("Room")
    }


    return (
        <View style={styles.container}>
            {buttons.map((button, index) => (
                <View
                    key={index}
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        onPress={() => openMeeting()}
                        style={{ ...styles.button, backgroundColor: button.customColor ? button.customColor : '#0470DC' }}
                    >
                        <FontAwesome name={button.name} size={23} color='#efefef' />
                    </TouchableOpacity>
                    <Text style={styles.menuText}>{button.title}</Text>
                </View>
            ))}
        </View>

    )
}

export default MenuButtons