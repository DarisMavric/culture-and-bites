
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Slot, useRouter } from "expo-router";
import { supabase } from "../lib/supabase"; // Adjust path as needed
import { AuthProvider, useAuth } from "../context/AuthContext";


const _layout = () => {

  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
};

const RootLayout = () => {
  const router = useRouter();
  const {setAuth} = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        router.replace('/home');
      } else {
        setAuth(null);
        router.replace('/signup');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default _layout;
