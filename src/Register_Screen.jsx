import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Dimensions} from 'react-native';
import { register_user } from '../Firebase/Authentication/Auth';
const {width, height} = Dimensions.get('window');

const Register_Screen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [name, setname] = useState('');

  const handle_user_details = async() => {
    if (!email || !password || !name) {
      Alert.alert('Enter Credentials first!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters!');
      return;
    }
    if (password !== confirm_password) {
      Alert.alert('Passwords are not same');
      return;
    }
    try {
      await register_user(email,password,name);
      Alert.alert("A verification email has been send to your email")
      setname('')
      setemail("")
      setpassword("")
      setconfirm_password("")
      navigation.navigate('TasksEntry')
    } catch (error) {
      Alert.alert("Error : ",error.message)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            {/* Circles and Header */}
            <View>
              <View style={styles.circle1}></View>
              <View style={styles.circle2}></View>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.Board}>
                <Text style={styles.title}>Welcome On-Board : )</Text>
                <Text style={styles.subtitle}>
                  Let's help you meet your tasks.
                </Text>
              </View>

              {/* Inputs */}
              <View style={styles.Input_fields}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setname}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize='none'
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
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirm_password}
                  onChangeText={setconfirm_password}
                />
              </View>

              {/* ✅ This will scroll with inputs */}
              <View style={styles.fixedBottom}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handle_user_details}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text
                      style={styles.signInText}
                      onPress={() => navigation.navigate('Login')}>
                      Sign in
                    </Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    left: width * 0.23,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: 'FuzzyBubbles-Bold',
    marginBottom: height * 0.01875,
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginLeft: width * 0.0125,
    marginBottom: height * 0.05,
  },
  Input_fields: {
    alignItems: 'center',
    marginTop: height * 0.2,
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

  fixedBottom: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  button: {
    backgroundColor: '#9c8676',
    paddingVertical: 18,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#333',
  },
  signInText: {
    color: '#004080',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Register_Screen;
