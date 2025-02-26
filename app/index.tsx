import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Redirect, useRouter } from "expo-router";

export default function Page() {
  const { session } = useAuth();
  const router = useRouter();

  router.replace('/home')

  return (
    <View style={{ backgroundColor: "#FAF6E3", flex: 1 }}>
      <Text>ASDASDSd</Text>
    </View>
  );
}
