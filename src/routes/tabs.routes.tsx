import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Badge } from "native-base";

import { Home } from '../screens/Home'
import { Shop } from '../screens/Shop'
import { Payments } from '../screens/Payments'
import { ClubDiamond } from '../screens/ClubDiamond'
import { Contract } from '../screens/Contract'
import { Gallery } from '../screens/Gallery'
import { Albuns } from '../screens/Albuns'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
  return(
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 5,
          backgroundColor: '#060610',
          position: 'absolute',
          borderTopWidth: 1,
          borderTopColor: '#060610',
          // borderTopColor: '#0e0e26'
        },
      }}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return <Ionicons name='home' color='#52b4ff' size={35} />

            return <Ionicons name='home-outline' color={color} size={35} />
          },
          tabBarActiveTintColor: '#52b4ff',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarLabel: 'Início'
        }}
      />

      <Tab.Screen 
        name="Payments"
        component={Payments}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return <Ionicons name='barcode' color='#FFFFFF' size={35} />

            return <Ionicons name='barcode-outline' color={color} size={35} />
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarLabel: 'Pagamentos'
        }}
      />

      <Tab.Screen 
        name="Contract"
        component={Contract}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return <Ionicons name='document-attach' color='#FFFFFF' size={35} />

            return <Ionicons name='document-attach-outline' color={color} size={35} />
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarLabel: 'Contrato'
        }}
      />

      {/* <Tab.Screen 
        name="Albuns"
        component={Albuns}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) return (
              <>
                <Badge bg='transparent' colorScheme="danger" rounded="full" mb={-5} mr={3} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                  fontSize: 10,
                  color: '#19BAFF'
                }}>
                  <Ionicons name='sparkles-sharp' color='#fff' size={15} />
                </Badge>
                <Ionicons name='images' color='#FFFFFF' size={35} />
              </>
            )

            return (
              <>
                <Badge bg='transparent' colorScheme="danger" rounded="full" mb={-5} mr={3} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                  fontSize: 10,
                  color: '#19BAFF'
                }}>
                  <Ionicons name='sparkles-sharp' color='#19BAFF' size={15} />
                </Badge>
                <Ionicons name='images-outline' color={color} size={35} />
              </>
            )
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarLabel: 'Álbuns'
        }}
      /> */}
    </Tab.Navigator>
  )
}
