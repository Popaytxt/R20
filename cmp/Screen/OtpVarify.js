// OtpInput.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

const OtpInput = ({ isTrue, isFalse, setSuccessModalVisible }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (index, value) => {
    if (/^[a-zA-Z0-9]*$/.test(value) && index >= 0 && index < 6) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5 && value.length === 1) {
        refs[index + 1].focus();
      }
    } else if (value.length === 0 && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      refs[index - 1].focus();
    }
  };

  const handleKeyDown = (index) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      refs[index - 1].focus();
    }
  };

  const demo = () => {
    return isTrue();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const enteredOtp = otp.join('');
      const response = await fetch('http://your-api-endpoint/api/OtpVerify', {
        method: 'POST',
        body: JSON.stringify({ otp: enteredOtp }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert(result.success);
        isTrue();
        setSuccessModalVisible(true);
      } else {
        isFalse();
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('Failed to verify OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (otp[0] === '') {
      refs[0].focus();
    }
  }, [otp]);

  const refs = [];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (refs[index] = ref)}
          style={{
            width: 40,
            height: 40,
            fontSize: 18,
            textAlign: 'center',
            margin: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
          }}
          maxLength={1}
          value={digit}
          onChangeText={(value) => handleInputChange(index, value)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleKeyDown(index);
            }
          }}
          onSubmitEditing={() => {
            if (index < 5) {
              refs[index + 1].focus();
            }
          }}
        />
      ))}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={demo}
        disabled={isSubmitting}
      >
        <Text style={{ color: '#fff' }}>{isSubmitting ? 'Verifying...' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    position: 'absolute',
    top: '100%',
  },
});

export default OtpInput;

