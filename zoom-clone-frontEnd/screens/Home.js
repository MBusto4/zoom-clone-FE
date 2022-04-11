import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import ContactsMenu from '../components/ContactsMenu'
import Header from '../components/Header'
import MenuButtons from '../components/MenuButtons'
import SearchBar from '../components/SearchBar'

//creating css for react-native
const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#1c1c1c',
            padding: 15,

        }
    }
)

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: '100%', }}>
                <Header />
                <SearchBar />
                <MenuButtons navigation={navigation} />
                <ContactsMenu />
            </SafeAreaView>

        </View>
    )
}

export default Home