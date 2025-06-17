import 'react-native-gesture-handler'
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from './src/screens/Splash';
import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { ForgotPassword } from './src/screens/ForgotPassword';
import { preventAutoHideAsync } from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base'
import { AuthProvider } from './src/contexts/auth';
import { MessagesProvider } from './src/contexts/messages';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import Routes from './src/routes'

import { THEME } from './src/theme';

preventAutoHideAsync()

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  const [splashComplete, setSplashComplete] = React.useState(false)

  return (
    splashComplete ? (
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>
          <MessagesProvider>
            <Routes />
          </MessagesProvider>
        </AuthProvider>
      </NativeBaseProvider>
    ) :
    <Splash onComplete={setSplashComplete} />
  );
}

export default App;