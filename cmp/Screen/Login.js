import React, { useRef } from 'react';
import { View, Text, Button, Animated, Easing } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../Redux/authSlice';
import LoginForm from '../loginC';
import SignupForm from '../signupC';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const translateY = useRef(new Animated.Value(300)).current;
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Perform your login logic here

    // Assuming you get some data (e.g., token) after a successful login
    const token = 'aman'; // Replace with your logic to get the token

    // Save the token to AsyncStorage
    await AsyncStorage.setItem('userToken', token);

    // Dispatch the setAuthenticated action
    dispatch(setAuthenticated());
  };

  const handleShutter = (action) => {
    // Perform slide-up or slide-down animation based on the action
    const toValue = action === 'open' ? 0 : -750;

    Animated.timing(translateY, {
      toValue,
      duration: 500, // Animation duration in milliseconds
      easing: Easing.ease, // You can customize the easing function
      useNativeDriver: false, // Set to false if you're not using the native driver
    }).start();
  };
handleShutter('close');
  return (
    <View style={{ flex: 1 }}>
      <Text>Login Screen</Text>
      <LoginForm />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Open Shutter" onPress={() => handleShutter('open')} />

         <Animated.View
        style={{
          height: '100%',
          transform: [{ translateY }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 50,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          marginTop: 20,
        }}
      >
        <Text>This is the sliding view</Text>
        <SignupForm />
        <Button title="Close Shutter" onPress={() => handleShutter('close')} />

        {/* Add your content here */}
      </Animated.View>
    </View>
  );
};

export default Login;

