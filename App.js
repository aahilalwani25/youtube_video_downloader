import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Views/LoginScreen';
import 'react-native-gesture-handler';



const Stack= createStackNavigator();

class App extends Component {
  
  render() {
    return (
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName='loginScreen'>
          <Stack.Screen name='loginScreen' component={LoginScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}

export default App;
