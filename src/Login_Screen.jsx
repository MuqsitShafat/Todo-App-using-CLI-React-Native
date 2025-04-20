import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import VintageIllustration from '../assets/illustrations/undraw_hello_ccwj.svg';
import { signin_user } from '../Firebase/Authentication/Auth';

const { width, height } = Dimensions.get('window');

const Login_Screen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handle_login_info = async () => {
    if (!email || !password) {
      Alert.alert('Enter Credentials first!');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Enter a valid email address!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters!');
      return;
    }
    try {
      await signin_user(email, password);
      setemail('');
      setpassword('');
      navigation.navigate("AfterLogin"); 
    } catch (error) {
      Alert.alert('Error:', error.message);
      console.log('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.Board}>
          <Text style={styles.title}>Welcome Back !</Text>
        </View>

        <View style={styles.illustration}>
          <VintageIllustration width={267} height={226} />
        </View>

        {/* Inputs */}
        <View style={styles.Input_fields}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setpassword}
          />
          <TouchableOpacity style={styles.forgot_password_parent} onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.forgot_password}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixedBottom}>
          <TouchableOpacity style={styles.button} onPress={handle_login_info}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text
                style={styles.signInText}
                onPress={() => navigation.navigate('Register')}>
                Sign up
              </Text>
            </Text>
          </View>
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
    fontWeight: 'bold',
    marginBottom: height * 0.01875,
    color: '#222',
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.18,
  },
  Input_fields: {
    alignItems: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: height * 0.02875,
    borderRadius: 25,
    fontSize: 14,
    color: '#000',
  },
  forgot_password_parent: {
    width: '85%',
    alignItems: 'flex-end',
    marginTop: height * -0.02,
  },
  forgot_password: {
    color: '#1D6CB3',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
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
  footer: {
    alignItems: 'center',
    marginTop: 5,
  },
  footerText: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  signInText: {
    color: '#004080',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login_Screen;
