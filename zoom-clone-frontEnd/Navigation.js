import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'
import MeetingRoms from './screens/MeetingRoms'
import Login from './screens/Login'


function Navigation() {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName={Login}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false
                    }} /> */}
            <Stack.Navigator initialRouteName={Home}>
                <Stack.Screen
                    name="Login"
                    component={Home}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Room"
                    component={MeetingRoms}
                    options={{
                        title: 'Start a Meeting',
                        headerStyle: {
                            backgroundColor: '#1c1c1c',
                            shadowOpacity: 0
                        },
                        headerTintColor: "white"
                    }} />
            </Stack.Navigator>
        </NavigationContainer >

    )
}

export default Navigation