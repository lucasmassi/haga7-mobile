import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from '../contexts/auth';

import TabRoutes from "./tabs.routes";
import StackRoutes from "./stack.routes";

export default function Routes() {
  const { auth } = React.useContext(AuthContext)

  return (
    <NavigationContainer>
      {!auth.authenticated ? <StackRoutes /> : <TabRoutes /> }
    </NavigationContainer>
  )
}