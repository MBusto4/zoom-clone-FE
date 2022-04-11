import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import 'react-native-gesture-handler';
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import store from "./store";
// import Routes from "./routes";
import { UsersProvider } from './usersContext'
import { SocketProvider } from './socketContext'
import { MainProvider } from './mainContext'








import Home from './screens/Home';

export default function App() {
  return (
    // <Provider store={store}>
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          <Navigation />
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});