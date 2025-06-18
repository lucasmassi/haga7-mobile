import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native"; 
import { VStack, Icon, HStack, Heading, Text, Center, Box, ScrollView, Button, Stack, Badge, TextArea, PresenceTransition } from "native-base";
import { View, StyleSheet, Dimensions, Image, StatusBar, Pressable, TextInput } from 'react-native'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated';
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import { HomeHeader } from "../components/Header";
import anuncio01 from '../assets/images/anuncio01.png'
import anuncio02 from '../assets/images/anuncio02.png'
import anuncio03 from '../assets/images/anuncio03.png'
import anuncio05 from '../assets/images/anuncio05.jpeg'
import { TabView, SceneMap } from 'react-native-tab-view';
import { AuthContext } from "../contexts/auth";
import { MessagesContext } from "../contexts/messages";
import Carousel from 'react-native-snap-carousel'
import { UserPhoto } from "../components/UserPhoto";
import LottieView from "lottie-react-native";
import api from "../services/api";

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTH * 0.88

const initialLayout = {
  width: Dimensions.get('window').width
};

const carouselItems = [
  {
    imgUrl: anuncio01
  },
  {
    imgUrl: anuncio02
  },
  {
    imgUrl: anuncio03
  },
  {
    imgUrl: anuncio05
  }
]

function carouselCardItem({item, index}: any) {
  return (
    <View style={styles.cardCarousel} key={index}>
      {/* <Text
        style={{
          fontSize: 16,
          padding: 15,
          color: "white",
          backgroundColor: '#19BAFF',
          maxWidth: 90,
          position: 'absolute',
          zIndex: 2,
          borderRadius: 10,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Ionicons
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "right",
          }}
          name="star"
        />
        Cupom
      </Text> */}
      <Image style={styles.image} source={item.imgUrl} />
    </View>
  )
}

function FirstRoute(messages: any, count = 0) {
  return <VStack>
      <ScrollView>
        {messages.all.map((message: any) => {
          {count = count + 1}
          <HStack key={count} borderRadius={5} paddingBottom={3} padding={2} bg="#000000" marginTop={5} alignItems="center">
            <LottieView
              autoPlay
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                backgroundColor: 'transparent',
              }}
              source={require('../assets/lottie/diamond-black.json')}
            />
            <VStack flex={1}>
              <Text color="gray.300" fontSize="sm">Equipe Diamond</Text>
              <Heading color="#FFFFFF" fontFamily="heading" fontSize="sm">{message.message}</Heading>
            </VStack>
            {/* <LottieView
                autoPlay
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'transparent',
                  marginRight: 10
                }}
                source={require('../assets/lottie/notify-blue.json')}
              /> */}
          </HStack>
        })}
      </ScrollView>
    </VStack>
}

const SecondRoute = () => (
  <Center color='white' flex={1} my="4">
    Nenhuma mensagem ainda...
  </Center>
  );

function ThirdRoute() {
  return <VStack>
  <ScrollView>
    <HStack borderRadius={5} paddingBottom={3} padding={2} bg="#000000" marginTop={5} alignItems="center">
      {/* Notificação
      <LottieView
        autoPlay
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'transparent',
          marginRight: 10
        }}
        source={require('../assets/lottie/notify-blue.json')}
      /> */}
      <VStack flex={1} alignItems='flex-end'>
        <Heading textAlign='right' color="#FFFFFF" fontFamily="heading" fontSize="sm">Me mandem o boleto atualizado</Heading>
        <Text color="gray.300" fontSize="sm">Eu • Enviado em 10/05/2024</Text>
      </VStack>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 50,
          height: 50,
          marginRight: 10,
          backgroundColor: 'transparent',
        }}
        source={require('../assets/lottie/user-white.json')}
      />
    </HStack>
  </ScrollView>
  </VStack>
};

export function Home() {
  const navigation = useNavigation()
  const { auth } = React.useContext(AuthContext)
  const { handleGetMessages, loadingMessages } = React.useContext(MessagesContext)
  const [daysToEnd, setDaysToEnd] = useState(0)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState({
    all: [],
    school: [],
    my: []
  })
  const [openChat, setOpenChat] = useState('')

  useEffect(() => {
    if (auth.school === 'aveline') {
      let date = (new Date("2024-12-14")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
  
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));
    } else if (auth.school === 'mestre') {
      let date = (new Date("2024-12-20")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
  
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));  
    } else if (auth.school === 'bomretiro') {
      let date = (new Date("2024-12-19")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
  
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));  
    } else if (auth.school === 'estadual-farroupilha') {
      let date = (new Date("2024-12-21")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
        
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));
    } else if (auth.school === 'cecilia-2024') {
      let date = (new Date("2024-12-23")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
        
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));
    } else if (auth.school === 'ifrs-caxias-2024') {
      let date = (new Date("2024-12-19")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
        
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));
    } else if (auth.school === 'emilio-meyer') {
      let date = (new Date("2024-12-22")).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000;
        
      setDaysToEnd(Math.abs(Math.floor((today - date) / msDay)));
    }
  }, [auth])

  useEffect(() => {
    async function loadMessages() {
      const response: any = await api.get(`/messageuser?school=${auth.school}`).catch(err => {
        console.log(err)
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
    }

    loadMessages()
  }, [])

  const [selected, setSelected] = useState('');

  return (
    <VStack flex={1} bgColor={"#060610"}>
      <HomeHeader />
      {/* CRONÔMETRO */}
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <VStack flex={1} style={{ marginLeft: 5, paddingLeft: 10, paddingRight: 10 , paddingBottom: 10, marginTop: -5}}>
          <Text fontSize='2xl' color='#FFFFFF' fontFamily='heading' marginTop={5} marginBottom={1} marginLeft={2}>Dashboard</Text>
        </VStack>
        <VStack h={300} flex={1} mb={5} mt={2} style={{ backgroundColor: '#0d1a31', borderRadius: 40, padding: 10, margin: 20 }}>
          <VStack h={150} alignItems='left' flex={1}>
            <VStack>
                <HStack>

                </HStack>
                <Text fontSize='md' color='#FFFFFF' fontFamily='body'>Vendas</Text>
            </VStack>
          </VStack>
        </VStack>

        <HStack mt={1}>
          {/* <Carousel
            data={carouselItems}
            renderItem={carouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            useScrollView={true}
            autoplay={true}
            loop={true}
          /> */}
        </HStack>

        {/* <VStack flex={1} mb={20} mt={20} style={{ backgroundColor: 'transparent'}}>
          <Text fontSize='md' color='#FFFFFF' fontFamily='heading' marginTop={5} marginBottom={1} marginLeft={2}>Chat do Formando</Text>
          <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Selecione o chat e fique por dentro de tudo!</Text>
          
        </VStack> */}
      </ScrollView>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cardCarousel: {
    width: ITEM_WIDTH,
  },
  image: {
    height: 250,
    width: ITEM_WIDTH,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
})
