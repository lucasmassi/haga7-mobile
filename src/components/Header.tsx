import React from 'react'
import { Heading, HStack, VStack, Text, Icon, Actionsheet, Box, Badge, Image } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

import { AuthContext } from '../contexts/auth';
// import { Notifications } from './Notifications';

export function HomeHeader() {
  const { handleLogout, auth } = React.useContext(AuthContext)
  const [actOpen, setActOpen] = React.useState(false)

  return (
    <>
    <HStack bg="#060610" pt='15%' pb={3} px={2} alignItems="center">
      <Image source={require('../assets/images/haga7logo.png')} alt='Haga7 Logo' resizeMode="cover" size={180} maxHeight={90} />
      <Box flex={1} ml={2}></Box>
      
      <TouchableOpacity onPress={() => setActOpen(true)}>
        {/* <Badge bg='red.600' colorScheme="danger" rounded="full" mb={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12
        }}>
            1
        </Badge> */}
        <Icon 
          as={Ionicons}
          name="menu-outline"
          color="white"
          size={9}
          mr={3}
          />
      </TouchableOpacity>
    </HStack>
    <Actionsheet isOpen={actOpen} onClose={() => setActOpen(false)}>
      <Actionsheet.Content backgroundColor='#202024'>
        {/* <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{
          color: "gray.300"
        }}>
            <Icon 
              as={Ionicons}
              name="notifications-outline"
              color="gray.500"
              size={5}
              mt={5}
            />
            Notificações
          </Text>
        </Box> */}
        <Actionsheet.Item onPress={() => handleLogout()} backgroundColor='#202024' _text={{ color: 'white' }} >Sair</Actionsheet.Item>
        <Actionsheet.Item width='100vh' isDisabled backgroundColor='#202024' alignSelf='flex-start' _text={{ color: 'white' }} alignContent='flex-start'>
          <Badge bg='#19BAFF' colorScheme="danger" rounded="full" mb={-6} mr={-20} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12,
          color: '#000'
        }}>
            Em breve
          </Badge>
          Notificações
        </Actionsheet.Item>
        <Actionsheet.Item width='100vh' isDisabled backgroundColor='#202024' alignSelf='flex-start' _text={{ color: 'white' }} alignContent='flex-start'>
          <Badge bg='#19BAFF' colorScheme="danger" rounded="full" mb={-6} mr={-20} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12,
          color: '#000'
        }}>
            Em breve
          </Badge>
          Club Diamond
        </Actionsheet.Item>
        <Actionsheet.Item width='100vh' isDisabled backgroundColor='#202024' alignSelf='flex-start' _text={{ color: 'white' }} alignContent='flex-start'>
          <Badge bg='#19BAFF' colorScheme="danger" rounded="full" mb={-6} mr={-20} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
          fontSize: 12,
          color: '#000'
        }}>
            Em breve
          </Badge>
          Meu Perfil
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
    </>
  )
}