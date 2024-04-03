// SignupForm.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import OtpInput from "./Screen/OtpVarify";
import LottieView from 'lottie-react-native';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const inputAnimationEmail = useRef(new Animated.Value(0)).current;
  const inputAnimationUsername = useRef(new Animated.Value(0)).current;
  const inputAnimationPassword = useRef(new Animated.Value(0)).current;
  const inputAnimationConfirmPassword = useRef(new Animated.Value(0)).current;

  const checkEmptyFields = () => {
    const emptyFields = Object.entries(formData).filter(([key, value]) => !value.trim());

    if (emptyFields.length > 0) {
      emptyFields.forEach(([fieldName]) => {
        switch (fieldName) {
          case 'email':
            shakeInput(inputAnimationEmail);
            break;
          case 'username':
            shakeInput(inputAnimationUsername);
            break;
          case 'password':
            shakeInput(inputAnimationPassword);
            break;
          case 'confirmPassword':
            shakeInput(inputAnimationConfirmPassword);
            break;
          default:
            break;
        }
      });

      return true;
    }

    return false;
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'email':
        validateEmail(value);
        break;
      case 'username':
        validateUsername(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'confirmPassword':
        validateConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/;

    setIsValidEmail(regex.test(email));

    if (!regex.test(email)) {
      shakeInput(inputAnimationEmail);
    }
  };

  const validateUsername = (username) => {
    setIsValidUsername(username.length > 0);
  };

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;

    setIsValidPassword(regex.test(password));

    if (!regex.test(password)) {
      shakeInput(inputAnimationPassword);
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    setIsValidConfirmPassword(confirmPassword === formData.password);

    if (confirmPassword !== formData.password) {
      shakeInput(inputAnimationConfirmPassword);
    }
  };

  const handleSignup = async () => {
    setIsButtonClicked(true);

    if (!isValidEmail || !isValidUsername || !isValidPassword || !isValidConfirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      shakeInput(inputAnimationConfirmPassword);
      return;
    }

    if (checkEmptyFields()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', 'An error occurred during signup.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const shakeInput = (animation) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.6,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: -0.1,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1.1,
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
    <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={[styles.formGroup]}>
        <Text>Email:</Text>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: !isValidEmail ? '#ff5555' : '#FCCADD',
              transform: [
                {
                  translateX: inputAnimationEmail.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-4, 4],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={[styles.input, !isValidEmail ? { backgroundColor: '#F08080' } : null]}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
      </View>

      <View style={[styles.formGroup]}>
        <Text>Username:</Text>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: !isValidUsername ? '#ff5555' : '#FCCADD',
              transform: [
                {
                  translateX: inputAnimationUsername.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-4, 4],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={[styles.input, !isValidUsername ? { backgroundColor: '#F08080' } : null]}
            placeholder="Enter your username"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
      </View>

      <View style={[styles.formGroup,]}>
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
              style={[styles.input, !isValidPassword ? { backgroundColor: '#F08080' } : null]}
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

      <View style={[styles.formGroup,]}>
        <Text>Confirm Password:</Text>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: !isValidConfirmPassword ? '#ff5555' : '#FCCADD',
              transform: [
                {
                  translateX: inputAnimationConfirmPassword.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-4, 4],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={[styles.input, !isValidConfirmPassword ? { backgroundColor: '#F08080' } : null]}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            secureTextEntry={!showPassword}
          />
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text>Sign Up</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            height: 230,
          }}>
            <Text>Verify with OTP</Text>
            <OtpInput isTrue={() => setIsSuccessModalVisible(true)} isFalse={() => Alert.alert('Invalid OTP. Please check again on your mail')} setSuccessModalVisible={setIsSuccessModalVisible} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#000',
                width: '97%',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isSuccessModalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSuccessModalVisible}
          onRequestClose={() => setIsSuccessModalVisible(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
          }}>
<LottieView
            source={require('./lotties/success.json')} // Replace with your animation file
            autoPlay={true}
            loop={true}
            
 style={{  width: 300, height: 500, } }
speed={0.8}
            hardwareAccelerationAndroid
          />
 <LottieView
            source={require('./lotties/success2.json')}
            autoPlay={true}
            loop={true}
            
 style={{  width: 700, height: 1000,  position:'absolute',} }
speed={0.8}
            hardwareAccelerationAndroid
          />

            <View style={{
              position:'absolute',
              backgroundColor: '#eee',
              padding: 10,
              borderRadius: 70,
              alignItems: 'center',
              height: 200,
              zIndex:-1,
            }}>
             

              <LottieView
            source={require('./lotties/vrifysuccess.json')}
            autoPlay={true}
            loop={true}
            
 style={{ borderWidth: 150  , width: 150, height: 100,marginTop: -50,} }
speed={0.8}
            hardwareAccelerationAndroid
          />


              <Text></Text>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 8,
  },
  signupButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  passwordToggle: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '95%',
    right: 3,
    transform: [{ translateY: -50 }],
    cursor: 'pointer',
  },
  passwordInputContainer: {
    position: 'relative',
  },
});

export default SignupForm;

