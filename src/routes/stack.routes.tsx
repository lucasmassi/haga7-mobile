import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { ForgotPassword } from "../screens/ForgotPassword";
import { CompleteProfile } from "../screens/CompleteProfile";

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
    </Stack.Navigator>
  )
}