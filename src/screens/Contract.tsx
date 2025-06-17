import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; 
import { VStack, FlatList, HStack, Heading, Button, Link, Box, Text, Center } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';
import { HomeHeader } from "../components/Header";
import contractSigned from "../assets/images/contract-signed.png"
import { AuthContext } from "../contexts/auth";
import * as WebBrowser from 'expo-web-browser';

export function Contract() {
  const { auth } = React.useContext(AuthContext)
  
  if (auth.signed) return SignedContract()

  return NotSignedContract()
}

const styles = StyleSheet.create({
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
});

function SignedContract() : any {
  const { auth } = React.useContext(AuthContext)

  async function handleDownload() {
    switch (auth.school) {
      case 'mestre':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1YLMXl9a98Tu0poMY6e3UxEz386pZm9lN/view?usp=sharing');
        break;
      case 'aveline':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1fYJIdrtXAryGUMBJVz8x3imAmdwBMT1m/view?usp=sharing');
        break;
      case 'emilio-meyer':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1jxP5136DdUP0IeAcuU9RUrmjyise9juf/view?usp=sharing');
        break;
      case 'cecilia-2024':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1N6XdrLPk1nYb2ZhjZ_GPV8awtoDqNgjD/view?usp=sharing');
        break;
      case 'ifrs-caxias-2024':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1fYJIdrtXAryGUMBJVz8x3imAmdwBMT1m/view?usp=sharing');
        break;
      case 'estadual-farroupilha':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1_mePLjzR2hDgKY2CUrzcc4D-CnmUt7nb/view?usp=sharing');
        break;
      case 'bom-retiro':
        await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1_GbaBCR9UQHsryStjWlFGjSoUTcckR5j/view?usp=sharing');
        break;
    }
  }

  return (
    <>
      <HomeHeader />
      <VStack flex={1} bgColor={"black"}>
        <Text paddingLeft={2} paddingRight={2} fontSize='lg' color='#FFFFFF' fontFamily='heading' >Contrato</Text>
        <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Consulte a situação do seu contrato.</Text>
        <Center>

        <Image style={styles.stretch} source={require('../assets/images/contract-signed.png')} alt='Signed' />
          <Button backgroundColor='#8cff2e' px="70" py="2" rounded="full" _text={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20
          }} leftIcon={<Ionicons name="checkmark-done-circle-outline" size={24} color="black" />}>
              Contrato Assinado
          </Button>
          <Button backgroundColor='rgb(46, 88, 255)' mt={5} px="70" py="2" rounded="full" _text={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20
          }} onPress={() => handleDownload()} leftIcon={<Ionicons name="cloud-download-outline" size={24} color="white" /> }>
            Baixar contrato
          </Button>
        </Center>
      </VStack>
    </>
  )
}

function NotSignedContract() : any {
  const { auth } = React.useContext(AuthContext)

  async function openContract() {
    await WebBrowser.openBrowserAsync(auth.contract_link);
  }

  return (
    <>
      <HomeHeader />
      <VStack flex={1} bgColor={"black"} paddingTop={100}>
        <Text paddingLeft={2} paddingRight={2} fontSize='lg' color='#FFFFFF' fontFamily='heading' >Contrato</Text>
        <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Consulte a situação do seu contrato.</Text>
        
        <Center>
          <Image style={styles.stretch} source={require('../assets/images/contract-signed.png')} alt='Signed' />
          <Button backgroundColor='#ff3019' px="70" py="2" rounded="full" _text={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20
          }} leftIcon={<Ionicons name="alert-circle-outline" size={24} color="black" />}>
              Pendente de Assinatura
          </Button>
          <Button backgroundColor='rgb(46, 88, 255)' mt={5} px="70" py="2" rounded="full" _text={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20
          }} onPress={() => openContract()} leftIcon={<Ionicons name="attach-outline" size={24} color="white" /> }>
            Assinar Contrato
          </Button>
        </Center>
      </VStack>
    </>
  )
}