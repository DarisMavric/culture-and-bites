import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@fontsource/league-spartan";
import { supabase } from "../../lib/supabase";
import React, { useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (session) {
      router.push("/interests");
    }

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.WelcomeText}>Dobro došli nazad!</Text>
      </View>
      <Text style={styles.WelcomeTextUnder}>
        Molimo Vas prijavite se da biste nastavili.
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          placeholderTextColor="#D8DBBD"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Lozinka"
          placeholderTextColor="#D8DBBD"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()}>
          <View style={styles.button1}>
            <Text style={styles.button1Color}>Prijavi se</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: "#B59F78",
          marginTop: 5,
          paddingRight: 25,
          fontSize: 15,
          textAlign: "right",
          fontWeight: "bold",
        }}
      >
        <Text style={styles.link}>
          Nemate kreiran nalog?{" "}
          <Text
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/signup")}
          >
            Kreiraj nalog
          </Text>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FAF6E3",
  },

  welcome: {
    alignItems: "flex-start",
    marginBottom: 20,
  },

  WelcomeText: {
    fontWeight: "bold",
    color: "#2A3663",
    fontSize: 28,
    textAlign: "center",
  },

  WelcomeTextUnder: {
    fontSize: 18,
    color: "#B59F78",
    textAlign: "left",
    maxWidth: 300,
  },

  inputSection: {
    width: "100%",
    maxWidth: 350,
  },

  input: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#D8DBBD",
    borderWidth: 1,
    color: "#2A3663",
  },

  buttons: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
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
    color: "white",
    fontSize: 22,
  },

  link: {
    marginTop: 20,
    color: "#B59F78",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  loginButton: {
    color: "rgb(29,50,92)",
    fontSize: 16,
  },
});
