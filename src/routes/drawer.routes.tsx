import React, { Fragment } from 'react'
import { DrawerContent, DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from '@expo/vector-icons'
import { AuthContext } from '../contexts/auth';
import { TouchableOpacity, Text } from 'react-native'

import TabRoutes from "./tabs.routes";
import { Home } from '../screens/Home'
import { Shop } from '../screens/Shop'
import { Payments } from '../screens/Payments'
import { ClubDiamond } from '../screens/ClubDiamond'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  const { handleLogout } = React.useContext(AuthContext)

  return (
    <Drawer.Navigator 
      // drawerContent={() => (
      //   <>
      //     <Text style={{ marginTop: 100 }}>Ola bom dia!</Text>
      //       <Drawer.Screen 
      //       name='drawer'
      //       component={TabRoutes}
      //       options={{
      //         drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
      //         drawerLabel: 'Home'
      //       }}
      //     />
      //   </>
      // )}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen 
        name='drawerTabs'
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
          drawerLabel: 'Home'
        }}
      />
    </Drawer.Navigator>
  )
}