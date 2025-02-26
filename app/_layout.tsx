
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
