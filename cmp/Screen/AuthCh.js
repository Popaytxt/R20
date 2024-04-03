// Splash.js
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setUnauthenticated, selectAuth } from '../Redux/authSlice';

const AuthCh = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    // Check for the token in your storage or perform any authentication check
    const storedAuthentication = isAuthenticated; // Replace with your logic to get this from storage

    if (storedAuthentication) {
      dispatch(setAuthenticated());
    } else {
      dispatch(setUnauthenticated());
    }

    // Navigating based on authentication status
    setTimeout(() => {
      navigation.replace(isAuthenticated ? 'MainAppScreen' : 'LoginScreen');
    }, 1000); // You can adjust the delay as per your requirement
  }, [dispatch, isAuthenticated, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

export default AuthCh;

