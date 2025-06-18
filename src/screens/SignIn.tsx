//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated';
import { AuthContext } from '../contexts/auth';

export function SignIn() {
  const navigation = useNavigation()
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: '',
  })

  const { handleLogin, auth } = React.useContext(AuthContext)

  useEffect(() => {
    if (auth.authenticated) navigation.navigate('Home')
  }, [auth])

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View className='bg-[#000000] h-full w-full'>
        <StatusBar style='light' />
        <Image className='h-full w-full absolute' source={require('../assets/images/background.png')} />

        {/* LOGO DIAMOND */}
        <View className='flex-row items-center w-[350] absolute p-10 ml-[-5px]'>
          <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(2)} className='w-full mt-5 ml-12' resizeMode='contain' source={require('../assets/images/haga7logo.png')} />
        </View>
        <View className='h-full w-full flex justify-around w-full pt-40 pb-10'>

          {/* FORM */}
          <View className='flex items-center mx-4 space-y-4 mb-20'>
            {auth.error.has && (
              <Animated.View alignItems='center' entering={FadeInDown.delay(200).duration(500).springify()} className='bg-[#ff4646] p-2 rounded-2xl w-full'>
                <Text className='text-[#FFFF] font-bold' style={{fontSize: 14}}>{auth.error.message}</Text>
              </Animated.View>
            )}
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-2xl w-full' style={{ opacity: 0.7 }}>
              <TextInput autoCapitalize={false} onChangeText={(text) => setDataLogin({...dataLogin, email: text})} className='text-[#19BAFF] font-bold' placeholder='E-mail' placeholderTextColor={'gray'} />
            </Animated.View >
            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className='bg-[#202024] p-5 rounded-2xl w-full' style={{ opacity: 0.7 }}>
              <TextInput autoCapitalize={false} onChangeText={(text) => setDataLogin({...dataLogin, password: text})} className='text-[#19BAFF] font-bold' placeholder='Senha' placeholderTextColor={'gray'} secureTextEntry />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='w-full'>
              {/* {!auth.isLoading ? <TouchableOpacity onPress={() => handleLogin({email: 'diamond@icapsulas.com.br'})} className='w-full bg-[#19BAFF] p-3 rounded-3xl mb-3'> */}
              {!auth.isLoading ? <TouchableOpacity onPress={() => handleLogin(dataLogin)} className='w-full bg-[#11223f] p-3 rounded-2xl mb-3'>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    pointerEvents: 'none',
                  }}>
                    <Text className='text-xl text-[#19BAFF] text-center font-bold'>Entrar</Text>
                  </View>
                </TouchableOpacity> :
                  <TouchableOpacity disabled className='w-full bg-[#19BAFF] p-3 rounded-3xl mb-3' style={{opacity: .5}}>
                   <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 23,
                    pointerEvents: 'none'
                  }}>
                    <ActivityIndicator size='medium' color='#19BAFF' />
                  </View>
                </TouchableOpacity>
              }
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='flex-row justify-center'>
              <Text className='text-[#c1c1c1] font-bold'>Não lembra sua senha?</Text>
              <TouchableOpacity onPress={() => navigation.push('ForgotPassword')}>
                <Text className='text-sky-600 text-[#19BAFF] font-bold'> Esqueci minha senha.</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
