import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const CountdownModal = ({ countdown, dataToShow, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationRef, setAnimationRef] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const initialProgress = 1 - countdown / initialCountdown;
    setProgress(initialProgress);

    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;

        // Update progress dynamically
        const newProgress = 1 - countdown / initialCountdown;
        setProgress(newProgress);
      } else {
        // Countdown is finished, close modal
        setIsVisible(false);
        clearInterval(interval);
        onClose();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      animationRef && animationRef.reset();
    };
  }, [countdown, onClose, animationRef]);

  const initialCountdown = 10; // Set your initial countdown time

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          {/* Lottie animation */}
          <LottieView
            ref={animation => setAnimationRef(animation)}
            source={require('../lotties/loadContainer.json')} // Replace with your animation file
            autoPlay={false}
            loop={false}
            progress={progress}
 style={{ backgroundColor: 'white', width: 200, height: 200,} }
speed={0.8}
            hardwareAccelerationAndroid
          />

          {/* Countdown display */}
          {countdown > 0 ? (
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Countdown: {countdown} seconds</Text>
          ) : (
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Bottle Filled!</Text>
          )}

          {/* Data to show */}
          <Text style={{ fontSize: 16, marginBottom: 20 }}>{dataToShow}</Text>

          {/* Button for navigation */}
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              onClose();
            }}
            style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, alignItems: 'center' }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CountdownModal;

