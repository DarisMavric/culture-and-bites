import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const [account, setAccount] = useState(null);
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    const getAccount = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id);

      if (error) {
        console.error("Error fetching account:", error);
        Alert.alert("Error", "Failed to load account.");
      } else {
        setAccount(data[0] || null);
      }
    };

    getAccount();
  }, [session?.user?.id]);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      await AsyncStorage.removeItem("userSession");
      router.replace("/signin");
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("sr-RS", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Moj Profil</Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          width: "100%",
        }}
      >
        {account ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              width: "100%",
            }}
          >
            <Image
              source={
                account.user_image
                  ? { uri: account.user_image }
                  : require("./7512444f-f54a-4ed1-8fcd-684a2c6c913b.png")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={styles.accountName}>{account.name}</Text>
            <Text
              style={[
                styles.accountEmail,
                { textAlign: "center", width: "100%" },
              ]}
            >
              {account.email}
            </Text>

            <Text style={styles.member}>
              Korisnik od {formatDate(account.created_at)}
            </Text>

            <View style={styles.preferencesContainer}>
              {account.preferences.map((preference, index) => (
                <View key={index} style={styles.preferenceItem}>
                  <Text style={styles.preferenceText}>{preference}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <TouchableOpacity onPress={() => signOut()}>
          <View style={styles.button1}>
            <Text style={styles.button1Color}>Odjavi se</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 45 : 10,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#2A3663",
    borderWidth: 2,
  },

  accountName: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#B59F78",
  },

  accountEmail: {
    fontSize: 18,
    marginTop: 5,
    color: "#B59F78",
  },

  preferencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },

  preferenceItem: {
    backgroundColor: "#2A3663",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
  },

  preferenceText: {
    color: "#B59F78",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  member: {
    marginTop: 5,
    fontSize: 14,
    color: "#B59F78",
    fontWeight: 300,
  },

  button1: {
    backgroundColor: "#2A3663",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },

  button1Color: {
    color: "#D8DBBD",
    fontSize: 22,
  },
});

export default Account;
