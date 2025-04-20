import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading_bar = () => {
  return (
    // {/* Lottie animation */}
    <View style={styles.container}>
      <View style={styles.Lottiew_wrapper}>
        <LottieView
          source={require('../assets/Animation_3.json')}
          style={{width: '100%', height: '60%'}}
          autoPlay
          loop={false}
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
export default Loading_bar;
