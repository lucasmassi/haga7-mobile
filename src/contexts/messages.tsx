/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { AuthContext } from "../contexts/auth";

export const MessagesContext = React.createContext<any>({all: [], school: [], my: []});
 
export const MessagesProvider: any = (props: any) => {
  const { auth } = React.useContext(AuthContext)
  const [messages, setMessages] = useState({
    all: [],
    school: [],
    my: []
  })
  const [loadingMessages, setLoadingMessages] = useState(true)

  async function handleGetMessages(body: any) {
    try {
      setLoadingMessages(true)
      const response: any = await api.get(`/messageuser?school=${auth.school}`).catch(err => {
        console.log(err)
        setLoadingMessages(false)
      })

      let all: any = []
      let school: any = []
      let my: any = []

      response.data.map((message: any) => {
        if (message.all) {
          all.push(message)
        } else if (message.school) {
          school.push(message)
        } else if (message.user_id) {
          my.push(message)
        }
      })

      setMessages({
        all,
        school,
        my
      })
      setLoadingMessages(false)
   } catch (err: any) {
      setMessages({
        all: [],
        school: [],
        my: []
      })
      setLoadingMessages(false)
    }
  }

  return (
    <MessagesContext.Provider value={{ messages, handleGetMessages, loadingMessages, setLoadingMessages }}>
      {props.children}
    </MessagesContext.Provider>
  )
}
