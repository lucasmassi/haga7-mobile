/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

export const AuthContext = React.createContext<any>({name: '', email: '', authenticated: false});
 
export const AuthProvider: any = (props: any) => {
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    uid: 0,
    authenticated: false,
    isLoading: false,
    is_complete: true,
    school: '',
    signed: false,
    points: 0,
    contract_link: '',
    error: {
      has: false,
      message: '',
    },
  })
  const [loadingLogin, setLoadingLogin] = useState(true)

  useEffect(() => {
    async function onLoad() {
      const token: any = await SecureStore.getItemAsync('diamond_token')
      const userId: any = await SecureStore.getItemAsync('diamond_user_id')
      const userName: any = await SecureStore.getItemAsync('diamond_user_name')
      const email: any = await SecureStore.getItemAsync('diamond_user_email')
      const is_complete: any = await SecureStore.getItemAsync('diamond_user_is_complete')
      const school: any = await SecureStore.getItemAsync('diamond_user_school')
      const signed: any = await SecureStore.getItemAsync('diamond_user_signed')
      const points: any = await SecureStore.getItemAsync('diamond_user_points')
      const contract_link: any = await SecureStore.getItemAsync('diamond_user_contract_link')
  
      if (token && token !== '') {
        setAuth({ 
          ...auth,
          authenticated: true,
          uid: JSON.parse(userId),
          name: JSON.parse(userName),
          email: JSON.parse(email),
          is_complete: JSON.parse(is_complete),
          school: JSON.parse(school),
          signed: JSON.parse(signed),
          points: JSON.parse(points),
          contract_link: JSON.parse(contract_link),
          isLoading: false,
        })
      } else {
        setAuth({
          ...auth,
          authenticated: false,
          isLoading: false,
        })
      }
    }

    onLoad()

  }, [])

  async function handleLogin(body: any) {
    try {
      if (!body.email || !body.password) {
        setAuth({
          ...auth,
          error: {
            has: true,
            message: 'E-mail e Senha são obrigatórios'
          },
        })

        return
      }

      setAuth({
        ...auth,
        isLoading: true,
        error: {
          has: false,
          message: '',
        },
      })
  
      const response = await api.post('/login', body)

      await SecureStore.setItemAsync('diamond_token', JSON.stringify(response.data.token))
      await SecureStore.setItemAsync('diamond_user_name', JSON.stringify(response.data.user.name))
      await SecureStore.setItemAsync('diamond_user_email', JSON.stringify(response.data.user.email))
      await SecureStore.setItemAsync('diamond_user_id', JSON.stringify(response.data.user.id))
      await SecureStore.setItemAsync('diamond_user_is_complete', JSON.stringify(response.data.user.is_complete))
      await SecureStore.setItemAsync('diamond_user_school', JSON.stringify(response.data.user.school))
      await SecureStore.setItemAsync('diamond_user_signed', JSON.stringify(response.data.user.signed))
      await SecureStore.setItemAsync('diamond_user_points', JSON.stringify(response.data.user.points))
      await SecureStore.setItemAsync('diamond_user_contract_link', JSON.stringify(response.data.user.contract_link))
      setAuth({
        name: response.data.user.name,
        email: response.data.user.email,
        uid: response.data.user.id,
        authenticated: true,
        error: {
          ...auth.error,
          has: false,
        },
        is_complete: response.data.user.is_complete,
        school: response.data.user.school,
        signed: response.data.user.signed,
        points: response.data.user.points,
        contract_link: response.data.user.contract_link,
        isLoading: false,
      })
   } catch (err: any) {
      console.log(err)

      setAuth({
        ...auth,
        error: {
          has: true,
          message: 'Erro ao tentar entrar. Tente Novamente.'
        },
        isLoading: false,
      })
    }
  }

  async function handleLogout() {
    await SecureStore.deleteItemAsync('diamond_token')
    await SecureStore.deleteItemAsync('diamond_user_name')
    await SecureStore.deleteItemAsync('diamond_user_email')
    await SecureStore.deleteItemAsync('diamond_user_id')
    await SecureStore.deleteItemAsync('diamond_user_is_complete')
    await SecureStore.deleteItemAsync('diamond_user_school')
    await SecureStore.deleteItemAsync('diamond_user_signed')
    await SecureStore.deleteItemAsync('diamond_user_points')
    await SecureStore.deleteItemAsync('diamond_user_contract_link')
    await SecureStore.deleteItemAsync('diamond_user_galleryImages')

    setAuth({
      name: '',
      email: '',
      uid: 0,
      authenticated: false,
      isLoading: false,
      is_complete: true,
      school: '',
      signed: false,
      points: 0,
      contract_link: '',
      error: {
        has: false,
        message: '',
      }
    })
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogin, handleLogout, loadingLogin, setLoadingLogin }}>
      {props.children}
    </AuthContext.Provider>
  )
}
