import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import VintageIllustration from '../assets/illustrations/undraw_forgot-password_odai.svg';
import {Dimensions} from 'react-native';
import { reset_password } from '../Firebase/Authentication/Auth';
const {width, height} = Dimensions.get('window');

const Forgot_Password = ({navigation}) => {
  const [email, setemail] = useState('');
  const forgot_password = async () => {
    if (!email) {
      Alert.alert('Enter Credentials first!');
      return;
    }
    try {
        await reset_password(email);
        Alert.alert('IMPORTANT','An email sended to your gmail.Reset password from there')
        setemail('')
        navigation.navigate('Login')
        
    } catch (error) {
        Alert.alert('Error is : ',error.message)
    }

  };
  return (
    <View style={styles.container}>
      {/* circles */}
      <View>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* title */}
        <View style={styles.Board}>
          <Text style={styles.title}>Forgot Password 🤔</Text>
        </View>
        {/* illustration */}
        <View style={styles.illustration}>
          <VintageIllustration width={240} height={200} />
        </View>
        {/* input fields */}
        <View style={styles.Input_fields}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email address"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={email}
            onChangeText={setemail}
          />
        </View>
        {/* reset button */}
        <View style={styles.fixedBottom}>
          <TouchableOpacity style={styles.button} onPress={forgot_password}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
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
  Board: {
    top: height * 0.25,
    left: width * 0.01,
    marginBottom: height * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: 'SpecialGothicCondensedOne-Regular',
    marginBottom: height * 0.01875,
    color: '#222',
  },
  illustration: {
    // position: 'relative',
    // top: height * 0.15,
    // left: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.18,
  },
  Input_fields: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: height * 0.02875,
    borderRadius: 25,
    fontSize: 14,
    color: '#000',
    elevation: 4,
  },
  fixedBottom: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  button: {
    backgroundColor: '#9c8676',
    paddingVertical: 15,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Forgot_Password;
