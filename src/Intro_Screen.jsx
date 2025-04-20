import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import VintageIllustration from '../assets/illustrations/undraw_vintage_q09n.svg';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const Intro_Screen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>
      <View style={styles.illustration}>
        <VintageIllustration width={200} height={250} />
      </View>
      <View style={styles.Intro_Body}>
        <Text style={styles.text}>Get Things Done with TODO</Text>
        <Text style={styles.text_2}>
          Your Daily Game Plan. Stay organized, stay productive. Let’s check off
          those tasks one by one!
        </Text>
      </View>
      {/* <View style={styles.Intro_Body}>
      </View> */}

      <View style={styles.button_wrapper}>
        <TouchableOpacity onPress={() =>navigation.navigate('Register')}>
          <View style={styles.button}>
            <Text style={styles.button_text}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  circle: {
    // flex : 1
  },
  circle1: {
    position: 'absolute',
    top: height * -0.02,
    left: width * -0.15,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#6c63ff',
    opacity: 0.5,
  },
  circle2: {
    position: 'absolute',
    top: height * -0.07,
    left: width * -0.01,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: '#6c63ff',
    opacity: 0.5,
  },
  illustration: {
    // position: 'relative',
    // top: height * 0.15,
    // left: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.2,
  },
  Intro_Body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: "FuzzyBubbles-Bold",
    textAlign: 'center',
  },
  text_2: {
    // color: '#000',
    // fontSize: 22,
    // fontWeight: 'bold',
    // lineHeight: 40,
    // position: 'absolute',
    // top: height * -0.06,
    // left: width * 0.15,
    // right: height * 0.07,
    color: '#4A4A4A',
    fontSize: 16,
    // fontWeight: '500',
    fontFamily : "Underdog-Regular",
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button_wrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#9C8B82',
    borderRadius: 99, // pill shape
    alignItems: 'center',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.3,
  },
  button_text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default Intro_Screen;
