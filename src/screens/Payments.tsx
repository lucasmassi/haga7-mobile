import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import { VStack, FlatList, HStack, Heading, Button, 
  Flex, Spacer, Link, Box, Center, ScrollView, 
  Text, Pressable,
  Skeleton, PresenceTransition } from "native-base";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';
import { HomeHeader } from "../components/Header";
import contractSigned from "../assets/images/contract-signed.png"
import { AuthContext } from "../contexts/auth";
import * as WebBrowser from 'expo-web-browser';
import api from "../services/api";

import numberToReal from "../utils/numberToReal";

const BOX_WIDTH = Dimensions.get('window').width

export function Payments() {
  const { auth, handleLogout } = React.useContext(AuthContext)
  
  if (auth.signed) return PaymentContract(auth, handleLogout)

  return NotPaymentContract()
}

function PaymentContract(auth:any, handleLogout:any) : any {
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasPayments, setHasPayments] = useState({
    jan: false,
    fev: false,
    mar: false,
    abr: false,
    mai: false,
    jun: false,
    jul: false,
    ago: false,
    set: false,
    out: false,
    nov: false,
    dez: false
  })
  const [monthsPaied, setMonthsPaied] = useState({
    jan: false,
    fev: false,
    mar: false,
    abr: false,
    mai: false,
    jun: false,
    jul: false,
    ago: false,
    set: false,
    out: false,
    nov: false,
    dez: false
  })
  const [monthsDelaied, setMonthsDelaied] = useState({
    jan: false,
    fev: false,
    mar: false,
    abr: false,
    mai: false,
    jun: false,
    jul: false,
    ago: false,
    set: false,
    out: false,
    nov: false,
    dez: false
  })

  const handleConsultPayments = (month:any) => {
    if (month === selectedMonth) setSelectedMonth(0)
    
    else setSelectedMonth(month)
  }

  async function handleDownload(fileId: any) {
    const response = await api.get(`/userdownload/${fileId}`)

    await WebBrowser.openBrowserAsync(response.data);
  }

  useEffect(() => {
    async function getPayments() {
      setLoading(true)
      try {
        const response = await api.get(`/user-payments/${auth.uid}`)
        setPayments(response.data)
        let monthsAux = {
          jan: false,
          fev: false,
          mar: false,
          abr: false,
          mai: false,
          jun: false,
          jul: false,
          ago: false,
          set: false,
          out: false,
          nov: false,
          dez: false
        }
        let monthsAuxDel = {
          jan: false,
          fev: false,
          mar: false,
          abr: false,
          mai: false,
          jun: false,
          jul: false,
          ago: false,
          set: false,
          out: false,
          nov: false,
          dez: false
        }
        let hasPaymentsAux = {
          jan: false,
          fev: false,
          mar: false,
          abr: false,
          mai: false,
          jun: false,
          jul: false,
          ago: false,
          set: false,
          out: false,
          nov: false,
          dez: false
        }

        response.data.map((payment: any) => {
          const dateLimit = moment(`${payment.year}-${payment.month}-${payment.day}/`, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
          const now = moment()
          let delayed = false

          if (dateLimit.isValid() && now.isAfter(dateLimit)) {
            delayed = true
          }

          switch (payment.month) {
            case 1:
              if (payment.paid) monthsAux.jan = true;
              if (delayed && !payment.paid) monthsAuxDel.jan = true;
              hasPaymentsAux.jan = true;
              break;
            case 2:
              if (payment.paid) monthsAux.fev = true;
              if (delayed && !payment.paid) monthsAuxDel.fev = true;
              hasPaymentsAux.fev = true;
              break;
            case 3:
              if (payment.paid) monthsAux.mar = true;
              if (delayed && !payment.paid) monthsAuxDel.mar = true;
              hasPaymentsAux.mar = true;
              break;
            case 4:
              if (payment.paid) monthsAux.abr = true;
              if (delayed && !payment.paid) monthsAuxDel.abr = true;
              hasPaymentsAux.abr = true;
              break;
            case 5:
              if (payment.paid) monthsAux.mai = true;
              if (delayed && !payment.paid) monthsAuxDel.mai = true;
              hasPaymentsAux.mai = true;
              break;
            case 6:
              if (payment.paid) monthsAux.jun = true;
              if (delayed && !payment.paid) monthsAuxDel.jun = true;
              hasPaymentsAux.jun = true;
              break;
            case 7:
              if (payment.paid) monthsAux.jul = true;
              if (delayed && !payment.paid) monthsAuxDel.jul = true;
              hasPaymentsAux.jul = true;
              break;
            case 8:
              if (payment.paid) monthsAux.ago = true;
              if (delayed && !payment.paid) monthsAuxDel.ago = true;
              hasPaymentsAux.ago = true;
              break;
            case 9:
              if (payment.paid) monthsAux.set = true;
              if (delayed && !payment.paid) monthsAuxDel.set = true;
              hasPaymentsAux.set = true;
              break;
            case 10:
              if (payment.paid) monthsAux.out = true;
              if (delayed && !payment.paid) monthsAuxDel.out = true;
              hasPaymentsAux.out = true;
              break;
            case 11:
              if (payment.paid) monthsAux.nov = true;
              if (delayed && !payment.paid) monthsAuxDel.nov = true;
              hasPaymentsAux.nov = true;
              break;
            case 12:
              if (payment.paid) monthsAux.dez = true;
              if (delayed && !payment.paid) monthsAuxDel.dez = true;
              hasPaymentsAux.dez = true;
              break;
          }
        })

        setMonthsPaied(monthsAux)
        setMonthsDelaied(monthsAuxDel)
        setHasPayments(hasPaymentsAux)
        setLoading(false)
      } catch (err: any ) {
        setLoading(false)
        if (err.response.status === 401) handleLogout()
      }
    }

    getPayments()
  }, [])

  return (
    <>
    <HomeHeader />
    <VStack flex={1} bgColor={"black"} paddingBottom={60}>
      <Text paddingLeft={2} paddingRight={2} fontSize='lg' color='#FFFFFF' fontFamily='heading' >Pagamentos</Text>
      <Text paddingLeft={2} paddingRight={2} marginBottom={5} fontSize='sm' color='#FFFFFF' fontFamily='body' opacity={0.5} >Consulte seus pagamentos, fique em dia e ganhe pontos!</Text>
      <Flex paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={30} alignItems="center">
      {loading ? (
            <>
              <Skeleton startColor='gray.600' rounded='md' h={20} width={BOX_WIDTH} />
              <Skeleton mt={5} startColor='gray.700' rounded='md' h={20} width={BOX_WIDTH} />
            </>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} width={BOX_WIDTH}>
              {hasPayments.jan && monthsPaied.jan ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Janeiro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.jan ? (
                    <>
                    <Pressable onPress={() => handleConsultPayments(1)}>
                    {monthsDelaied.jan ? (
                      <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 2 ? 'gray.700' : 'black'}>
                        <LottieView
                            autoPlay
                            style={{
                              width: 20,
                              height: 20,
                              backgroundColor: 'transparent',
                              position: 'relative',
                            }}
                            source={require('../assets/lottie/notify-red.json')}
                          />
                        <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Janeiro</Text>
                        {selectedMonth === 1 ?
                          (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                          (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                      </Center>
                      ) : (
                      <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 1 ? 'gray.700' : 'black'}>
                        <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Janeiro</Text>
                        {selectedMonth === 1 ? 
                          (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                          (<Ionicons name='chevron-forward' color='white' size={30} />) }
                      </Center>
                    )}
                    </Pressable>
                    <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 1 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                      {payments.map((payment:any) => {
                        if (payment.month === 1) {
                          return (
                            <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                              <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/01/' + payment.year}</Text>
                              <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                <Ionicons name='barcode-outline' color='white' size={30} />
                                <Text onPress={() => handleDownload(payment.file_id)} style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                              </Pressable>
                            </Flex>
                          )
                        }
                      })}
                    </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.fev && monthsPaied.fev ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Fevereiro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.fev ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(2)}>
                      {monthsDelaied.fev ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 2 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Fevereiro</Text>
                          {selectedMonth === 2 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 2 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Fevereiro</Text>
                          {selectedMonth === 2 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                    </Pressable>
                    <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 2 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                      {payments.map((payment:any) => {
                        if (payment.month === 2) {
                          return (
                            <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                              <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                              <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/02/' + payment.year}</Text>
                              <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                <Ionicons name='barcode-outline' color='white' size={30} />
                                <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                              </Pressable>
                            </Flex>
                          )
                        }
                      })}
                    </Flex>
                  </>
                  ): ''}
                </>
              )}
              {hasPayments.mar && monthsPaied.mar ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Março</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.mar ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(3)}>
                      {monthsDelaied.mar ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 3 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Março</Text>
                          {selectedMonth === 3 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 3 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Março</Text>
                          {selectedMonth === 3 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 3 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 3) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/03/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.abr && monthsPaied.abr ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Abril</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.abr ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(4)}>
                      {monthsDelaied.abr ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 4 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Abril</Text>
                          {selectedMonth === 4 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 4 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Abril</Text>
                          {selectedMonth === 4 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 4 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 4) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/04/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.mai && monthsPaied.mai ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Maio</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.mai ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(5)}>
                      {monthsDelaied.mai ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 5 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Maio</Text>
                          {selectedMonth === 5 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 5 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Maio</Text>
                          {selectedMonth === 5 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 5 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 5) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/05/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.jun && monthsPaied.jun ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Junho</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.jun ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(6)}>
                      {monthsDelaied.jun ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 6 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Junho</Text>
                          {selectedMonth === 6 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 6 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Junho</Text>
                          {selectedMonth === 6 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 6 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 6) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/06/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>  
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.jul && monthsPaied.jul ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Julho</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.jul ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(7)}>
                      {monthsDelaied.jul ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 7 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Julho</Text>
                          {selectedMonth === 7 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 7 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Julho</Text>
                          {selectedMonth === 7 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 7 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 7) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/07/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>    
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.ago && monthsPaied.ago ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Agosto</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.ago ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(8)}>
                      {monthsDelaied.ago ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 8 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Agosto</Text>
                          {selectedMonth === 8 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 8 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Agosto</Text>
                          {selectedMonth === 8 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 8 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 8) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/08/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.set && monthsPaied.set ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Setembro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.set ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(9)}>
                      {monthsDelaied.set ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 9 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Setembro</Text>
                          {selectedMonth === 9 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 9 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Setembro</Text>
                          {selectedMonth === 9 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 9 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 9) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/09/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.out && monthsPaied.out ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Outubro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.out ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(10)}>
                      {monthsDelaied.out ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 10 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Outubro</Text>
                          {selectedMonth === 10 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 10 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Outubro</Text>
                          {selectedMonth === 10 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 10 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 10) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/10/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.nov && monthsPaied.nov ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Novembro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.nov ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(11)}>
                      {monthsDelaied.out ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 11 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Novembro</Text>
                          {selectedMonth === 11 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 11 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Novembro</Text>
                          {selectedMonth === 11 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 11 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 11) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/11/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
              {hasPayments.dez && monthsPaied.dez ? (
                <Center marginBottom={2} width={BOX_WIDTH} style={styles.button} bg='#51ff2c'>
                  <Text color='gray.600' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Dezembro</Text>
                  <Ionicons name='checkmark-done-circle' color='#202024' size={20} />
                </Center>
              ) : (
                <>
                  {hasPayments.dez ? (
                    <>
                      <Pressable onPress={() => handleConsultPayments(12)}>
                      {monthsDelaied.out ? (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 12 ? 'gray.700' : 'black'}>
                          <LottieView
                              autoPlay
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: 'transparent',
                                position: 'relative',
                              }}
                              source={require('../assets/lottie/notify-red.json')}
                            />
                          <Text color='#ff2c2c' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Dezembro</Text>
                          {selectedMonth === 12 ?
                            (<Ionicons name='chevron-down-outline' color='#ff2c2c' size={30} />) :
                            (<Ionicons name='chevron-forward' color='#ff2c2c' size={30} />) }
                        </Center>
                        ) : (
                        <Center marginBottom={5} size={20} width={BOX_WIDTH} style={styles.button} bg={selectedMonth === 12 ? 'gray.700' : 'black'}>
                          <Text color='white' fontSize='lg' fontFamily='heading' style={styles.text_inside_btn}>Dezembro</Text>
                          {selectedMonth === 12 ? 
                            (<Ionicons name='chevron-down-outline' color='white' size={30} />) :
                            (<Ionicons name='chevron-forward' color='white' size={30} />) }
                        </Center>
                      )}
                      </Pressable>
                      <Flex bg='gray.700' style={styles.paymentBody} display={selectedMonth === 12 ? 'flex' : 'none'} paddingLeft={2} marginTop={-10} paddingRight={2} paddingTop={10} marginBottom={5} paddingBottom={12} flex={1} width={BOX_WIDTH} h={30} alignItems="left">
                        {payments.map((payment:any) => {
                          if (payment.month === 12) {
                            return (
                              <Flex key={payment.id} style={{justifyContent: 'space-between'}} direction="row" paddingLeft={2} paddingRight={2} paddingBottom={10} flex={1} width={BOX_WIDTH} h={100} alignItems="left">
                                <Text color='white' fontSize='md' fontFamily='heading'>R$ {numberToReal(payment.value)}</Text>
                                <Text color='white' fontSize='md' fontFamily='heading'>{payment.day + '/12/' + payment.year}</Text>
                                <Pressable onPress={() => handleDownload(payment.file_id)} style={styles.view_pay_account}>
                                  <Ionicons name='barcode-outline' color='white' size={30} />
                                  <Text style={styles.buttontxt} color='white' fontSize='sm' marginTop={-3} fontFamily='body'>Pagar boleto</Text>
                                </Pressable>
                              </Flex>
                            )
                          }
                        })}
                      </Flex>
                    </>
                  ) : ''}
                </>
              )}
            </ScrollView>
          )}
      </Flex>
    </VStack>
    </>
  )
}

function NotPaymentContract() : any {
  const { auth } = React.useContext(AuthContext)

  async function openContract() {
    await WebBrowser.openBrowserAsync(auth.contract_link);
  }

  return (
    <VStack alignItems='center' flex={1} bgColor={"black"} paddingTop={100}>
      <Image style={styles.stretch} source={require('../assets/images/contract-signed.png')} alt='Signed' />
      <Box backgroundColor='#ff3019' px="70" py="2" rounded="full" _text={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20
        }}>
          Pendente de Assinatura
      </Box>
      <Link onPress={() => openContract()} mt="8">
        <Box backgroundColor='#1f2020' px="100" py="4" rounded="md" _text={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20
        }}>
          Assinar Contrato
        </Box>
      </Link>
    </VStack>
    
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    borderRadius: 10,
    borderBottomColor: '#202024',
    borderBottomWidth: 1,
    borderTopColor: '#202024',
    borderTopWidth: 1,
    borderLeftColor: '#202024',
    borderLeftWidth: 1,
    borderRightColor: '#202024',
    borderRightWidth: 1,
  },
  paymentBody: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomColor: '#202024',
    borderBottomWidth: 1,
    borderLeftColor: '#202024',
    borderLeftWidth: 1,
    borderRightColor: '#202024',
    borderRightWidth: 1,
  },
  text_inside_payment: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
  buttontxt: {
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row'
  },
  text_inside_btn: {
    width: '90%',
    textAlign: 'center',
  },
  view_pay_account: {
    flexDirection: 'column',
    alignItems: 'center', 
    marginTop: -20, 
    paddingTop: 3, 
    borderRadius: 10, 
    backgroundColor: '#202024'
  },
})
