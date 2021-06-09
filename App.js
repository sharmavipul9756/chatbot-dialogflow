import 'react-native-gesture-handler';
import React, { Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatbotScreen from './app/screens/Chatbot'
import LoginScreen from './app/screens/Login'


const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer  initialRouteName="Login">
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} 
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
          />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} 
          name="Chatbot"
          component={ChatbotScreen}
          options={{ title: 'Chatbot' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}

export default App

