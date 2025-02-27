import { useEffect, useState } from "react";
import { FlatListComponent, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { Slot, Tabs, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";


const _layout = () => {
    
  return (
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#2A3663",
        tabBarActiveTintColor: "#B59F78",
        tabBarInactiveTintColor: "#B59F78",
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          bottom: 0,
          paddingBottom: 0,
          backgroundColor: "#D8DBBD",
          
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          },
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
          tabBarIcon: ({ color, size, }) => (
            <Ionicons name="save" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myTrips"
        options={{
          title: "My Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="#B59F78" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="#B59F78" size={size} />
          ),
        }}
      />
    </Tabs>
  );
};


export default _layout;