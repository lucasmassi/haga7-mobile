import { useState } from "react";
import { useNavigation } from "@react-navigation/native"; 
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { HomeHeader } from "../components/Header";

export function Profile() {
  const navigation = useNavigation()

  return (
    <VStack flex={1} bgColor={"white"}>
      <Text>Meu Perfil</Text>
    </VStack>
  )
} 