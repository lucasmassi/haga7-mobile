//@ts-nocheck
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useToast, Box, Center, VStack, Button, Alert, HStack } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import {
  Text, View, Image, TextInput, 
  TouchableOpacity, KeyboardAvoidingView,
  ActivityIndicator, StyleSheet, ScrollView,
  Platform,
} from 'react-native';
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated';
import { AuthContext } from '../contexts/auth';
import MaskInput from 'react-native-mask-input';
import LottieView from 'lottie-react-native';
import api from '../services/api';

export function CompleteProfile() {
  const navigation = useNavigation()
  const [messageError, setMessageError] = useState()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [cpf, setCPF] = useState()
  const [cpfOwner, setCPFOwner] = useState()
  const [cep, setCEP] = useState()
  const [rg, setRG] = useState()
  const [phoneStudent, setPhoneStudent] = useState()
  const [phoneOwner, setPhoneOwner] = useState()
  const [birth, setBirth] = useState()
  const animation = useRef(null);
  const ToastDetails = [{
    title: "Ops! Alguns campos estão vazios",
    variant: "top-accent",
    description: "Verifique todos os campos obrigatórios"
  }];
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    address: '',
    district: '',
    city: '',
    cep: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    instagram: '',
    x: '',
    tiktok: '',
    rg: '',
    name_owner: '',
    cpf_owner: '',
    phone_owner: '',
    birth_date: '',
  })
  const toast = useToast();
 
  const { handleLogin, auth } = React.useContext(AuthContext)

  async function handleCompleteData() {
    setLoading(true)

    if (formData.name === '' || formData.cpf === ''
      || formData.address === '' || formData.city === ''
          || formData.cep === '' || formData.phone === '' 
            || formData.password === '' || formData.confirm_password === ''
              || formData.rg === '' || formData.birth_date === '') {
                toast.show({
                  render: () => {
                    setLoading(false)
                    return (
                      <ToastAlert 
                        id={1} 
                        title="Ops! Alguns campos estão vazios"
                        variant="top-accent"
                        description="Verifique todos os campos obrigatórios"
                      />
                    )
                  }
                });
                return
              }
    
    const response: any = await api.put(`/users/${auth.uid}`, {
      name: formData.name,
      cpf: formData.cpf,
      rg: formData.rg,
      phone: formData.phone,
      password: formData.password,
      confirm_password: formData.confirm_password,
      birth_date: formData.birth_date,
      cpf_owner: formData.cpf_owner,
      name_owner: formData.name_owner,
      phone_owner: formData.phone_owner,
      cep: formData.cep,
      address: formData.address + ', ' + formData.city
    }).catch(err => {
      <ToastAlert
        id={2}
        title="Erro ao salvar cadastro!"
        variant="top-accent"
        description='Não foi possível salvar, tente novamente.'
      />

      console.log(err.response)
      setLoading(false)
    })

    const currentPass = formData.password
    if(response && response.status === 200) {
      setFormData({
        name: '',
        cpf: '',
        address01: '',
        address02: '',
        address_number: '',
        district: '',
        city: '',
        cep: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        instagram: '',
        x: '',
        tiktok: '',
        rg: '',
        name_owner: '',
        cpf_owner: '',
        phone_owner: '',
        birth_date: '',
      })
      setLoading(false)
      setShowSuccess(true)

      setTimeout(() => {
        handleLogin({ email: auth.email, password: currentPass })
      }, 2000)
    }

    setLoading(false)
  }

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
        {!showSuccess ? (
        <ScrollView className='bg-[#000000] h-full w-full'>
          <StatusBar style='light' />
          <View className='flex items-center pt-20 pl-3 pr-3 w-full text-[#FFFFFF]'>
            <Text style={styles.titleTextBlue}>Bem-vindo(a)!</Text>
            <Text style={styles.titleText}>Complete seu cadastro para acessar pela primeira vez!</Text>
          </View>
          <View className='h-full w-full flex justify-around w-full pb-10'>
            <View className='flex items-center mx-4 space-y-3 mb-20'>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='flex-row w-full'>
                <Text style={styles.subtitleText}>Seus dados (Formando)</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, name: value})} placeholder='Nome completo *' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='CPF *' 
                  placeholderTextColor={'gray'}
                  value={cpf}
                  onChangeText={(masked, unmasked) => {
                    setCPF(masked)
                    setFormData({ ...formData, cpf: masked})
                  }}
                  mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, address: value})} placeholder='Endereço Completo *' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, city: value})} placeholder='Cidade *' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  placeholder='RG *'
                  style={{color: 'white'}}
                  placeholderTextColor={'gray'}
                  value={rg}
                  onChangeText={(masked, unmasked) => {
                    setRG(masked)
                    setFormData({ ...formData, rg: masked})
                  }}
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='Celular *' 
                  placeholderTextColor={'gray'}
                  value={phoneStudent}
                  onChangeText={(masked, unmasked) => {
                    setPhoneStudent(masked)
                    setFormData({ ...formData, phone: masked})
                  }}
                  mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='CEP *' 
                  placeholderTextColor={'gray'}
                  value={cep}
                  onChangeText={(masked, unmasked) => {
                    setCEP(masked)
                    setFormData({ ...formData, cep: masked})
                  }}
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='Data de Nascimento *' 
                  placeholderTextColor={'gray'}
                  value={birth}
                  onChangeText={(masked, unmasked) => {
                    setBirth(masked)
                    setFormData({ ...formData, birth_date: masked})
                  }}
                  mask={[/\d/, /\d/, '/' , /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, password: value})} placeholder='Nova Senha *' placeholderTextColor={'gray'} secureTextEntry />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, confirm_password: value})} placeholder='Confirmar Senha *' placeholderTextColor={'gray'} secureTextEntry />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, instagram: value})} placeholder='Instagram' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, x: value})} placeholder='X' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, tiktok: value})} placeholder='TikTok' placeholderTextColor={'gray'} />
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='flex-row w-full'>
                <Text style={styles.subtitleText}>Responsável (Pai, Mãe ou Responsável Legal)</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <TextInput style={{color: 'white'}} onChangeText={(value) => setFormData({ ...formData, name_owner: value})} placeholder='Nome completo' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='CPF' 
                  placeholderTextColor={'gray'}
                  value={cpfOwner}
                  onChangeText={(masked, unmasked) => {
                    setCPFOwner(masked)
                    setFormData({ ...formData, cpf_owner: masked})
                  }}
                  mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-[#202024] p-5 rounded-3xl w-full'>
                <MaskInput
                  style={{color: 'white'}}
                  placeholder='Celular' 
                  placeholderTextColor={'gray'}
                  value={phoneOwner}
                  onChangeText={(masked, unmasked) => {
                    setPhoneOwner(masked)
                    setFormData({ ...formData, phone_owner: masked})
                  }}
                  mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='w-full'>
                {!loading ? <TouchableOpacity onPress={async () => await handleCompleteData()} className='w-full bg-[#19BAFF] p-3 rounded-3xl mb-3'>
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 23,
                      pointerEvents: 'none'
                    }}>
                      <Text className='text-xl text-[#202024] text-center'>Finalizar cadastro</Text>
                    </View>
                  </TouchableOpacity> :
                    <TouchableOpacity disabled style={{opacity: 0.5}} className='w-full bg-[#19BAFF] p-3 rounded-3xl mb-3'>
                      <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 23,
                      pointerEvents: 'none'
                    }}>
                      <ActivityIndicator size='medium' color='#202024' />
                    </View>
                  </TouchableOpacity>
                }
              </Animated.View>
            </View>
          </View>
        </ScrollView>
        ) : (
        <View className='flex items-center pl-3 pr-3 w-full bg-[#000] text-[#FFFFFF]'>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 500,
              height: '100%',
              backgroundColor: 'transparent',
            }}
            source={require('../assets/lottie/checked-true.json')}
          />
        </View>
        )}

      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 23,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  titleTextBlue: {
    color: '#19BAFF',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 19,
    fontWeight: '300',
    textAlign: 'left',
    marginTop: 20,
    color: '#FFFFFF'
  }
})

const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable,
  ...rest
}) => <Alert backgroundColor='#ff6262' maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "danger"} variant={variant} {...rest}>
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text style={{ fontSize: 15 }} fontSize="md" fontWeight="bold" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
            {title}
          </Text>
        </HStack>
        {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
        color: variant === "solid" ? "lightText" : "darkText"
      }} onPress={() => toast.close(id)} /> : null}
      </HStack>
      <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
        {description}
      </Text>
    </VStack>
  </Alert>;
