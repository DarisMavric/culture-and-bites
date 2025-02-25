import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Slot, Tabs, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";


const _layout = () => {
    
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#2A3663",
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="#B59F78" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="save" color="#B59F78" size={size} />
          ),
        }}
      />
    </Tabs>
  </>
  );
};


export default _layout;
