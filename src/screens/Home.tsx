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
    <VStack flex={1} bgColor={"#000000"}>
      <HomeHeader />
      {/* CRONÔMETRO */}
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <VStack flex={1} alignItems='center' marginBottom={2}>
        <Text fontSize='md' color='#FFFFFF' fontFamily='heading'>Sua conquista vai ser comemorada em...</Text>

        <HStack justifyContent="space-between" mt={5}>
          <VStack justifyContent='center' mt='4' mr='-5' borderRadius='full' width='120' height='120' bgColor='#19BAFF' borderWidth='4' borderColor='#7DD8FF' color="gray.200" fontSize="md" fontFamily="heading">
            <Heading color='black' fontSize='3xl' textAlign='center' alignItems='center'>{auth.points}</Heading>
            <Heading color='black' fontSize='md' textAlign='center' alignItems='center'>Pontos</Heading>
          </VStack>
          <VStack justifyContent='center' borderRadius='full'  width='150' height='150' bgColor='#19BAFF' borderWidth='4' borderColor='#7DD8FF' color="gray.200" fontSize="md" fontFamily="heading">
            <Heading color='black' fontSize='6xl' textAlign='center' alignItems='center'>{daysToEnd}</Heading>
            <Heading color='black' fontSize='md' textAlign='center' alignItems='center'>Dias</Heading>
          </VStack>
          <VStack justifyContent='center' mt='4' ml='-5' borderRadius='full' width='120' height='120' bgColor='#19BAFF' borderWidth='4' borderColor='#7DD8FF' color="gray.200" fontSize="md" fontFamily="heading">
            <Heading color='black' fontSize='3xl' textAlign='center' alignItems='center'>0</Heading>
            <Heading color='black' fontSize='md' textAlign='center' alignItems='center'>Tarefas </Heading>
          </VStack>
        </HStack>
      </VStack>

      <HStack mt={1}>
          <Carousel
            data={carouselItems}
            renderItem={carouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            useScrollView={true}
            autoplay={true}
            loop={true}
          />
      </HStack>

      {/* <VStack flex={1} ml={2} mr={2}>
        <Text fontSize='md' color='#FFFFFF' fontFamily='heading' marginTop={10} marginBottom={1} marginLeft={2}>Cronograma</Text>
        <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Acompanhe seu cronograma e se programe com antecedência!</Text>
        
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: '10',
            height: 350
          }}
          // Specify the current date
          current={'2024-08-07'}
          // Callback that gets called when the user selects a day
          onDayPress={(day: any) => {
            console.log('selected day', day);
          }}
          // Mark specific dates as marked
          markedDates={{
            '2024-08-10': {selected: true, marked: true, selectedColor: 'blue'},
            '2024-08-20': {marked: true},
            '2024-08-15': {selected: true, marked: true, selectedColor: 'blue'}
          }}
        />

        <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2012-05-22': [{name: 'item 1 - any js object'}],
          '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
          '2012-05-24': [],
          '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          console.log('day pressed');
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed');
        }}
        // Initially selected day
        selected={'2012-05-16'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2012-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return <View />;
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View />;
        }}
        // Override inner list with a custom implemented component
        // renderList={listProps => {
        //   return <MyCustomList {...listProps} />;
        // }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={true}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={false}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2012-05-16': {selected: true, marked: true},
          '2012-05-17': {marked: true},
          '2012-05-18': {disabled: true}
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // Agenda container style
        style={{}}
      />

      </VStack> */}

      <VStack flex={1} mb={20}>
        <Text fontSize='md' color='#FFFFFF' fontFamily='heading' marginTop={5} marginBottom={1} marginLeft={2}>Chat do Formando</Text>
        <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Selecione o chat e fique por dentro de tudo!</Text>
        <Stack justifyContent='space-between' direction="column" mb="10" mt="1.5" ml={2} mr={2} space={3}>
          <Pressable onPress={() => openChat === 'geral' ? setOpenChat('') : setOpenChat('geral')}>
            <Center justifyContent='space-around' bg={openChat === 'geral' ? 'gray.600' : 'gray.700'} rounded='md' _text={{
                color: "white",
                fontWeight: "bold",
                paddingTop: 4,
                paddingBottom: 4,
              }} shadow={"3"}>
                {/* <LottieView
                  autoPlay
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 10
                  }}
                  source={require('../assets/lottie/notify-pink.json')}
                /> */}
                {messages.all.length === 0 ? (
                  <Ionicons name='ellipse-sharp' color='white' size={10}
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      alignSelf: 'flex-start',
                      marginTop: 22,
                      marginLeft: 27,
                      opacity: 0.3
                    }}
                  />
                ) : (
                  <Badge colorScheme='blueGray' rounded="full" ml={5} mt={4} zIndex={1} variant="solid" alignSelf="flex-start" position='absolute' _text={{ fontSize: 12 }}>
                    {messages.all.length}
                  </Badge>
                )}
              GERAL
            </Center>
          </Pressable>
            {openChat === 'geral' && messages.all.map((message: any) => {
              return <PresenceTransition visible={openChat === 'geral'} initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1,
                    transition: {
                      duration: 250
                    }
                  }}>
                <HStack flex={1} key={message.id} borderLeftRadius={10} borderBottomLeftRadius={10} borderBottomRightRadius={10} justifyContent='space-between' bg="gray.600">
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
                    <Heading paddingBottom={2} color="#FFFFFF" fontFamily="heading" fontSize="sm">{message.message}</Heading>
                  </VStack>
                </HStack>
              </PresenceTransition>
            })}
          <Pressable onPress={() => openChat === 'school' ? setOpenChat('') : setOpenChat('school')}>
            <Center justifyContent='space-around' bg={openChat === 'school' ? 'gray.600' : 'gray.700'}  rounded='md' _text={{
                color: "white",
                fontWeight: "bold",
                paddingTop: 4,
                paddingBottom: 4,
              }} shadow={"3"}>
                {/* <LottieView
                  autoPlay
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 10
                  }}
                  source={require('../assets/lottie/notify-orange.json')}
                /> */}
                {/* <Ionicons name='close-outline' color='white' size={30}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                /> */}
                {messages.school.length === 0 ? (
                  <Ionicons name='ellipse-sharp' color='white' size={10}
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      alignSelf: 'flex-start',
                      marginTop: 22,
                      marginLeft: 27,
                      opacity: 0.3
                    }}
                  />
                ) : (
                  <Badge colorScheme='warning' rounded="full" ml={5} mt={4} zIndex={1} variant="solid" alignSelf="flex-start" position='absolute' _text={{ fontSize: 12 }}>
                    {messages.school.length}
                  </Badge>
                )}
              ESCOLA
            </Center>
          </Pressable>
          {openChat === 'school' && messages.school.map((message: any) => {
              return <PresenceTransition visible={openChat === 'school'} initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1,
                    transition: {
                      duration: 250
                    }
                  }}>
                <HStack flex={1} key={message.id} borderLeftRadius={10} borderBottomLeftRadius={10} borderBottomRightRadius={10} justifyContent='space-between'
                  bg="gray.600">
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
                    <Heading paddingBottom={2} color="#FFFFFF" fontFamily="heading" fontSize="sm">{message.message}</Heading>
                  </VStack>
                </HStack>
              </PresenceTransition>
            })}
          <Pressable onPress={() => openChat === 'my' ? setOpenChat('') : setOpenChat('my')}>
            <Center justifyContent='space-around' bg={openChat === 'my' ? 'gray.600' : 'gray.700'}  rounded='md' _text={{
                color: "white",
                fontWeight: "bold",
                paddingTop: 4,
                paddingBottom: 4,
              }} shadow={"3"}>
                {/* <LottieView
                  autoPlay
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 10
                  }}
                  source={require('../assets/lottie/notify-blue.json')}
                /> */}
                {/* <Ionicons name='close-outline' color='white' size={30}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                /> */}
                {messages.my.length === 0 ? (
                  <Ionicons name='ellipse-sharp' color='white' size={10}
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      alignSelf: 'flex-start',
                      marginTop: 22,
                      marginLeft: 27,
                      opacity: 0.3
                    }}
                  />
                ) : (
                <Badge colorScheme='cyan' rounded="full" ml={5} mt={4} zIndex={1} variant="solid" alignSelf="flex-start" position='absolute' _text={{ fontSize: 12 }}>
                  {messages.my.length}
                </Badge>
                )}
              MEU CHAT
            </Center>
          </Pressable>
          {openChat === 'my' && messages.my.map((message: any) => {
              return <PresenceTransition visible={openChat === 'my'} initial={{
                opacity: 0
              }} animate={{
                opacity: 1,
                transition: {
                  duration: 250
                }
              }}> 
                <HStack flex={1} key={message.id} borderLeftRadius={10} borderBottomLeftRadius={10} borderBottomRightRadius={10} justifyContent='space-between'
                  bg="gray.600">
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
                    <Heading paddingBottom={2} color="#FFFFFF" fontFamily="heading" fontSize="sm">{message.message}</Heading>
                  </VStack>
                </HStack>
              </PresenceTransition>
            })}
        </Stack>
      </VStack>
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
