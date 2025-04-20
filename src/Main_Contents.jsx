import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VintageIllustration from '../assets/illustrations/undraw_online-organizer_1kdy.svg';
import {Dimensions} from 'react-native';
import {sign_out} from '../Firebase/Authentication/Auth';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const {width, height} = Dimensions.get('window');

const Main_Contents = () => {
  const Logout_function = async () => {
    try {
      await sign_out();
      Alert.alert('LogOut Successfully!');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const [task, settask] = useState([]);
  const auth = getAuth();
  const currentuser = auth.currentUser;
  useEffect(() => {
    if (!currentuser) return;

    const unsubscribe = firestore()
      .collection('Tasks')
      .where('uid', '==', currentuser.uid)
      .onSnapshot(querySnapshot => {
        const tasklist = [];
        querySnapshot.forEach(doc => {
          tasklist.push({id: doc.id, ...doc.data()});
        });

        console.log('Tasks:', tasklist); // 🔥 Add this
        settask(tasklist);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logouy Button */}
      <TouchableOpacity onPress={Logout_function} style={styles.Logout_button}>
        <Text style={styles.Logout_text}>LOG OUT</Text>
      </TouchableOpacity>

      {/* circle */}
      <View>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>

      {/* rectangle */}
      <View style={styles.Rectangle}></View>

      {/* illustration */}
      <View style={styles.illustration}>
        <VintageIllustration width={250} height={180} />
      </View>

      {/* Logined User Name  */}
      <View style={styles.Logined_User}>
        <Text style={styles.User_name}>
          Hello {currentuser?.displayName || 'User'}
        </Text>
      </View>

      {/* Clock */}
      <View>
        <View style={styles.container}>
          <View style={styles.digitalClock}>
            <Text style={styles.timeText}>{time.hours}</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.timeText}>{time.minutes}</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.timeText}>{time.seconds}</Text>
          </View>
        </View>
      </View>
      {/* Tasks Lists */}
      <View style={styles.tasks_heading}>
        <Text style={styles.pendings}>Pending Tasks List</Text>
      </View>
      <View style={styles.tasks_list}>
        <FlatList
          data={task}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.notext}>No tasks found!!!</Text>
            </View>
          }
          renderItem={({item}) => (
            <Text style={styles.tasks_list_text}>{' >  '}
             {item.name} - {item.age} 
            </Text>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  Logout_button: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.76,
    width: width * 0.19,
    height: width * 0.1,
    borderRadius: 7,
    borderColor: '#F67280',
    borderWidth: 0.5,
    // backgroundColor : "#e3dbdb",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  Logout_text: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
  circle1: {
    position: 'absolute',
    top: height * -0.02,
    left: width * -0.15,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  circle2: {
    position: 'absolute',
    top: height * -0.07,
    left: width * -0.01,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  Rectangle: {
    width: '100%',
    height: height * 0.44, // 30% of screen height
    backgroundColor: '#6c63ff',
    opacity: 0.5,
    width: '100%',
  },
  illustration: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.15,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: height * 0.18,
  },
  Logined_User: {
    alignItems: 'flex-end',
    left: width * -0.1,
    top: height * 0.015,
  },
  User_name: {
    color: '#000',
    // fontWeight: 'bold',
    fontFamily: 'SpecialGothicCondensedOne-Regular',
    fontSize: 30,
  },
  digitalClock: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 15,
    position: 'absolute',
    left: width * 0.25,
    top: height * 0.06,
    elevation: 10,
  },
  timeText: {
    color: '#000000',
    fontSize: 35,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  separator: {
    color: '#000000',
    fontSize: 35,
    fontWeight: 'bold',
  },
  tasks_heading: {
    position: 'absolute',
    top: height * 0.68,
    left: width * 0.23,
    alignItems: 'center',
  },
  pendings: {
    color: '#000',
    fontFamily: 'SpecialGothicCondensedOne-Regular',
    // fontWeight: 'bold',
    fontSize: 32,
  },
  tasks_list: {
    position: 'absolute',
    top: height * 0.74,
    left: width * 0.1,
    width: '80%',
    backgroundColor: '#D2DFDE',
    height: height * 0.27,
    borderRadius: 15,
    elevation: 9,
  },
  tasks_list_text: {
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 12,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    flexWrap: 'wrap',
  },
  notext: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight : 'bold'
  },
  emptyContainer: {
    flex: 1,
    height: height * 0.27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
export default Main_Contents;
