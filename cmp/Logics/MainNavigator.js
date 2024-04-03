// MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Redux/authSlice';
import AuthCh from '../Screen/AuthCh';
import App from '../../App';
import Login from '../Screen/Login';
import OTPVerificationScreen from "../Screen/OtpVarify";
const Stack = createStackNavigator();

const MainNavigator = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="authCheck" component={AuthCh} />
        {isAuthenticated ? (
          <Stack.Screen name="MainAppScreen" component={App} />
        ) : (
          <Stack.Screen name="LoginScreen" component={Login} />

          )}
        <Stack.Screen name='OtpVarifyScreen' component={OTPVerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

