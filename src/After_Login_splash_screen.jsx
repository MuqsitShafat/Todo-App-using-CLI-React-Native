import {StyleSheet, View} from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const After_Login_splash_screen = ({navigation}) => {
    const handleAnimationFinish = () => {
      navigation.navigate('Main'); // ✅ Move after animation
    };
  return (
    // {/* Lottie animation */}
    <View style={styles.container}>
      <View style={styles.Lottiew_wrapper}>
        <LottieView
          source={require('../assets/Animation_4.json')}
          style={{width: '100%', height: '60%'}}
          autoPlay
          loop={false}
          onAnimationFinish={handleAnimationFinish}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent : 'center',
    // alignItems : 'center',
  },
  Lottiew_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default After_Login_splash_screen;
