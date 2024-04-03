// App.js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUnauthenticated } from './cmp/Redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const dispatch = useDispatch();
  const [storedString, setStoredString] = useState('');

  useEffect(() => {
    // Retrieve the stored string from AsyncStorage
    const retrieveStoredString = async () => {
      try {
        const storedString = await AsyncStorage.getItem('userToken');
        if (storedString) {
          setStoredString(storedString);
        }
      } catch (error) {
        console.error('Error retrieving stored string:', error);
      }
    };

    retrieveStoredString();
  }, []);

  const handleLogout = () => {
    // Perform your logout logic here

    // Remove the stored string from AsyncStorage
    AsyncStorage.removeItem('userToken');

    // Dispatch the setUnauthenticated action
    dispatch(setUnauthenticated());
  };

  return (
    <View style={styles.container}>
      {storedString ? (
        <Text>Stored String: {storedString}</Text>
      ) : (
        <Text>No stored string found.</Text>
      )}
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

