//@ts-nocheck
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated';
import { Modal, Button, ActivityIndicator } from 'native-base';
import api from "../services/api";
import { useState } from 'react';
import { color } from 'native-base/lib/typescript/theme/styled-system';

export function ForgotPassword() {
  const navigation = useNavigation()
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [email, setEmail] = useState('')

  async function handleSendEmail(e: any) {
    e.preventDefault()
    setLoadingEmail(true)
    await api.post('/forgot-password', {
      email
    })
    .then((response: any) => {
      if (response.status === 200) setModalVisible(true)

      setLoadingEmail(false)
    })
    .catch(err => {
      setLoadingEmail(false)
    })
  }

  function handleCloseModal(e: any) {
    e.preventDefault()

    setModalVisible(false)
    navigation.navigate('SignIn')
  }

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
            <Animated.Text entering={FadeInDown.delay(200).duration(1000).springify()} className='text-xl text-white text-center mb-5'>
              Esqueceu sua senha? Insira seu e-mail.
            </Animated.Text>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-2xl w-full' style={{ opacity: 0.7 }}>
              <TextInput onChangeText={(text) => setEmail(text)} autoCapitalize={false} className='text-[#19BAFF] font-bold'  placeholder='E-mail' placeholderTextColor={'gray'} />
            </Animated.View >
            <TouchableOpacity disabled={loadingEmail} onPress={(e: any) => handleSendEmail(e)} className='w-full bg-[#11223f] p-3 rounded-2xl mb-3'>
              <Animated.View disabled={loadingEmail} entering={FadeInDown.delay(600).duration(1000).springify()} className='w-full'>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    pointerEvents: 'none'
                  }}>
                    <Text className='text-xl text-[#19BAFF] text-center font-bold'>Enviar código</Text>
                  </View>
              </Animated.View>
            </TouchableOpacity>
            <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='flex-row justify-center'>
              <Text className='text-white'>Já tem Login?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignIn')}>
                <Text className='text-sky-600 text-[#19BAFF] font-bold'> Lembrei minha senha.</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Modal isOpen={modalVisible} onClose={(e:any) => handleCloseModal(e)}>
            <Modal.Content bg='gray.600' borderColor='gray.700'>
              <Modal.CloseButton />
              <Modal.Header bg='gray.600' borderColor='gray.700' _text={{color: 'white', }} >E-mail enviado com sucesso!</Modal.Header>
              <Modal.Body >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Confira o seu e-mail, enviamos a nova senha!</Text>
              </Modal.Body>
              <Modal.Footer bg='gray.600' borderColor='gray.700' >
                <Button.Group space={2}>
                  <Button _text={{color: 'white'}} variant="ghost" colorScheme="blueGray" onPress={(e) => {
                  handleCloseModal(e);
                }}>
                    Fechar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
