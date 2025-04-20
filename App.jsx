import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import Intro_Screen from './src/Intro_Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register_Screen from './src/Register_Screen';
import Login_Screen from './src/Login_Screen';
import Main_Contents from './src/Main_Contents';
import Tasks_Entry_Component from './src/Tasks_Entry_Component';
import Forgot_Password from './src/Forgot_Password';
import { getAuth } from '@react-native-firebase/auth';
import Loading_bar from './src/Loading_bar';
import After_Login_splash_screen from './src/After_Login_splash_screen';
import BootSplash from 'react-native-bootsplash'; // ✅ Import BootSplash

const Stack = createNativeStackNavigator();
const auth = getAuth();

const App = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      setUser(user);
      setTimeout(async () => {
        setInitializing(false);

        // ✅ Hide bootsplash screen when everything is ready
        await BootSplash.hide({ fade: true });
        console.log('BootSplash has been hidden');
      }, 500);
    });

    return subscriber;
  }, []);

  if (initializing) return <Loading_bar />;

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Screen
              name="AfterLogin"
              component={After_Login_splash_screen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen name="Main" component={Main_Contents} />
            <Stack.Screen name="Loading" component={Loading_bar} />
            <Stack.Screen name="TasksEntry" component={Tasks_Entry_Component} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Intro"
              component={Intro_Screen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Register"
              component={Register_Screen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Forgot"
              component={Forgot_Password}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Login"
              component={Login_Screen}
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen name="Loading" component={Loading_bar} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
