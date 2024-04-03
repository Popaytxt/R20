import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });

  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputAnimationMobile = useRef(new Animated.Value(0)).current;
  const inputAnimationPassword = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isButtonClicked) {
      shakeInput(inputAnimationMobile);
      shakeInput(inputAnimationPassword);
    }
  }, [isButtonClicked]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (name === 'mobileNumber') {
      validateMobileNumber(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    const isValidLength = mobileNumber.length === 10;
    const startsWithValidDigit = /^[6789]/.test(mobileNumber);

    setIsValidMobile(isValidLength && startsWithValidDigit);

    if (!isValidLength || !startsWithValidDigit) {
      shakeInput(inputAnimationMobile);
    }
  };

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;

    if (!regex.test(password)) {
      setIsValidPassword(false);
      shakeInput(inputAnimationPassword);
    } else {
      setIsValidPassword(true);
    }
  };

  const handleLogin = async () => {
    setIsButtonClicked(true);

    if (!isValidMobile || !isValidPassword || !formData.mobileNumber.trim() || !formData.password.trim()) {
      return;
    }

    try {
      // Your login logic here
      console.warn('Login clicked with data:', formData);
      // Fetch request will be different in React Native

      // For example:
      // const result = await fetch('http://localhost:3000/api/Login', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Handle the result accordingly

    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error accordingly
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to trigger shake animation
  const shakeInput = (animation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: -0.1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0.1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.formGroup}>
        <Text>Mobile Number:</Text>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: !isValidMobile ? '#ff5555' : '#FCCADD',
              transform: [
                {
                  translateX: inputAnimationMobile.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-4, 4],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChangeText={(text) => handleInputChange('mobileNumber', text)}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
      </View>

      <View style={styles.formGroup}>
        <Text>Password:</Text>
          <View style={styles.passwordInputContainer}>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: !isValidPassword ? '#ff5555' : '#FCCADD',
              transform: [
                {
                  translateX: inputAnimationPassword.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-4, 4],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={!showPassword}
          />
        </Animated.View>
     <TouchableOpacity style={styles.passwordToggle} onPress={togglePasswordVisibility}>
        <Text>{showPassword ? '👀' : '🔒'}</Text>
      </TouchableOpacity>

      </View>
      </View>

      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your styling here
  loginContainer: {
    margin: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 26,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    padding: 8,
    textAlign: 'center',
    letterSpacing: 1, // Add letter spacing
    fontWeight: 'bold',
     
  },
  passwordToggle: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  top: '95%',
  right: 3,
  transform: [{ translateY: -50 }],
  cursor: 'pointer',
  
  transition: 'opacity 0.3s ease-in-out',
  outline: 'none',
  },
  loginButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  passwordInputContainer: {
  position: 'relative',
},

});

export default LoginForm;

