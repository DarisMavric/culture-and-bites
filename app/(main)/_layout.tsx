import { useEffect, useState } from "react";
import {
  FlatListComponent,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Slot, Tabs, useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
          position: "absolute",
          height: Platform.OS === "ios" ? 70 : 60,
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
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="#B59F78" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="blogger-b" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myTrips"
        options={{
          title: "My Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color="#B59F78" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color="#B59F78" size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
