
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Slot, Stack, useRouter } from "expo-router";
import { supabase } from "../lib/supabase"; // Adjust path as needed
import { AuthProvider, useAuth } from "../context/AuthContext";



const RootLayout = () => {


  

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(main)" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="(trip)" options={{headerShown: false}}/>
        <Stack.Screen name="(AI)" options={{headerShown: false}}/>
        <Stack.Screen name="index" options={{headerShown: false}}/>
      </Stack>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
  },
});

export default RootLayout;
