import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Views/LoginScreen';
import 'react-native-gesture-handler';
import AuthController from './Controller/AuthController';
import Dashboard from './Views/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.authController = new AuthController();
    this.state = {
      idToken: null,
      email: null,
      name: null,
      photo: null,
      isSignedIn: false,
    };
  }

  async getCredentials() {
    if (await this.authController.isSignedIn()) {
      AsyncStorage.multiGet(['email', 'name', 'idToken', 'photo']);
    }
  }

  render() {
    this.authController
      .isSignedIn(GoogleSignin)
      .then(val => this.setState({isSignedIn: val}));
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            this.state.isSignedIn ? 'dashboard' : 'loginScreen'
          }>
          <Stack.Screen
            name="loginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
