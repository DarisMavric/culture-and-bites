import {
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { supabase } from "../../lib/supabase";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          email,
        },
      },
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
        <Text style={styles.WelcomeText}>Dobro došli!</Text>
      </View>

      <Text style={styles.WelcomeTextUnder}>
        Molimo vas da popunite sledeća polja kako biste kreirali nalog.
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Ime"
          placeholderTextColor="#D8DBBD"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#D8DBBD"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Lozinka"
          placeholderTextColor="#D8DBBD"
          secureTextEntry
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button1}
          disabled={loading}
          onPress={signUpWithEmail}
        >
          <Text style={styles.button1Color}>Registruj se</Text>
        </TouchableOpacity>
        <Text style={styles.link}>
          Već imate nalog?{" "}
          <Text
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/signin")}
          >
            Prijavi se
          </Text>
        </Text>
      </View>
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
    fontSize: 25,
    textAlign: "center",
  },

  WelcomeTextUnder: {
    fontSize: 16,
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
    height: 45,
    borderRadius: 10,
    width: "100%",
  },

  button1Color: {
    color: "white",
    fontSize: 20,
  },

  link: {
    marginTop: 10,
    color: "#B59F78",
    fontSize: 14,
    textAlign: "center",
  },

  loginButton: {
    color: "rgb(29,50,92)",
    fontSize: 16,
  },
});
