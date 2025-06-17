import React from 'react'
import { Heading, HStack, VStack, Text, Icon, Actionsheet, Box, Badge } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

import { AuthContext } from '../contexts/auth';
import { Notifications } from './Notifications';

export function HomeHeader() {
  const { handleLogout, auth } = React.useContext(AuthContext)
  const [actOpen, setActOpen] = React.useState(false)

  return (
    <>
    <HStack bg="#000000" pt='15%' pb={3} px={2} alignItems="center">
      <UserPhoto
        source={require('../assets/images/user.png')}
        size={14}
        alt='Imagem usuário'
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.300" fontSize="md">Bem-Vindo(a)</Text>
        <Heading color="#FFFFFF" fontFamily="heading" fontSize="lg">{auth.name}</Heading>
      </VStack>

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