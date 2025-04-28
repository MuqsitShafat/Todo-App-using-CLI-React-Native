import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';

const Tasks_Entry_Component = ({navigation}) => {
  const [taskcounter, settaskcounter] = useState(0);
  const [task, settask] = useState('');
  const [tasktime, settasktime] = useState('');
  const maxLimit = 5;

  const setcounter = async () => {
    if (!task || !tasktime) {
      Alert.alert('Enter a valid task and time!');
      return;
    }

    if (taskcounter < maxLimit) {
      settaskcounter(taskcounter + 1);
      settask('');
      settasktime('');

      const auth = getAuth();
      const currentuser = auth.currentUser;

      if (currentuser) {
        try {
          await firestore().collection('Tasks').add({
            name: task,
            age: tasktime,
            userEmail: currentuser.email,
            uid: currentuser.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log('Task added!');
        } catch (error) {
          console.log(error);
        }

        if (taskcounter + 1 <= maxLimit - 1) {
          Alert.alert(`${taskcounter + 1} task entered.`);
        }
        if (taskcounter + 1 === maxLimit) {
          Alert.alert('Congrats');
          navigation.navigate('Main');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* circle */}
      <View>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>

      {/* Lottie animation */}
      <View style={styles.Lottiew_wrapper}>
        <LottieView
          source={require('../assets/Animation_2.json')}
          style={{width: '100%', height: '60%'}}
          autoPlay
          loop
        />
        {/* Tasks Limit */}
        <Text style={styles.text_1}>You have 5 tasks to Enter</Text>
        <Text style={styles.text_2}>(For One day) </Text>
      </View>
      {/* <TouchableOpacity style={styles.done_button_view} onPress={setcounter}>
        <Text style={styles.done_button}>Done </Text>
      </TouchableOpacity> */}

      {/* Tasks Entry */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Inputs */}
        <View style={styles.Input_fields}>
          <TextInput
            style={styles.input}
            placeholder="Enter the Task"
            placeholderTextColor="#999"
            value={task}
            onChangeText={settask}
          />
          <Text style={styles.counter}>({taskcounter})</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Time for Task"
            placeholderTextColor="#999"
            value={tasktime}
            onChangeText={settasktime}
          />
        </View>
        <View style={styles.fixedBottom}>
          <TouchableOpacity style={styles.button} onPress={setcounter}>
            <Text style={styles.buttonText}>Save</Text>
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
  Lottiew_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_1: {
    color: '#000',
    fontSize: 25,
    // fontWeight: 'bold',
    fontFamily: 'FuzzyBubbles-Bold',
  },
  text_2: {
    color: 'gray',
    fontSize: 15,
    marginBottom: 8,
  },
  Input_fields: {
    alignItems: 'center',
    // marginTop: height * 0.02,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: height * 0.02875,
    borderRadius: 25,
    fontSize: 14,
    color: '#000',
    elevation: 10,
  },
  counter: {
    position: 'absolute',
    color: 'gray',
    fontSize: 24,
    left: width * 0.835,
    top: height * 0.013,
  },
  done_button_view: {
    backgroundColor: 'darkblue',
    // height: 'auto',
    // width: 'auto',
    borderRadius: 999,
    position: 'absolute',
    left: width * 0.78,
    top: height * 0.63,
    paddingHorizontal: 7,
    paddingVertical: 5,
    elevation: 10,
  },
  done_button: {
    color: '#fff',
  },
  fixedBottom: {
    alignItems: 'center',
    // marginTop : height * 0.03
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
export default Tasks_Entry_Component;
