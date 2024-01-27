import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './Views/LoginScreen';
import 'react-native-gesture-handler';
import AuthController from './Controllers/AuthController.mjs';
import Dashboard from './Views/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

class App extends Component {

  constructor(props){
    super(props);

    this.authController= new AuthController();
    this.state={
      "idToken":null,
      "email":null,
      "name":null,
      "photo":null,
    }

  }

  async getCredentials(){
    if(await this.authController.isSignedIn()){
      AsyncStorage.multiGet(["email","name"])
    }
  }
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.isSignedIn()?"dashboard":"loginScreen"}>
          <Stack.Screen
            name="loginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
          name='dashboard'
          component={Dashboard}
          options={{
            headerShown:false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
