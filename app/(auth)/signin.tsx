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
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    router.replace("/home");
  }

  return (
    <SafeAreaView>
      <Image style={styles.ImageStyle} source={require("./test.webp")} />
      <View style={styles.welcome}>
        <Text style={styles.WelcomeText}>Welcome To Culture & Bites</Text>
        <Text style={styles.WelcomeTextUnder}>
          Ulogujte se ili kreirajte novi nalog
        </Text>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="#D8DBBD"
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="#D8DBBD"
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity>
          <View style={styles.button1}>
            <Text
              style={styles.button1Color}
              disabled={loading}
              onPress={() => signInWithEmail()}
            >
              Sign In
            </Text>
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
        <Link href="/signup">Create New Account</Link>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageStyle: {
    width: "100%",
    height: "40%",
  },
  WelcomeText: {
    fontWeight: "bold",
    color: "#2A3663",
    fontSize: 25,
  },
  WelcomeTextUnder: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#B59F78",
  },
  inputLabel: {
    fontSize: 18,
  },
  inputSection: {
    fontSize: 30,
    padding: 25,
  },
  input: {
    padding: 10,
    marginTop: 5,
    height: 45,
    backgroundColor: "#B59F78",
    borderRadius: 10,
    color: "#D8DBBD"
  },
  buttons: {
    shadowColor: "0",
    paddingLeft: 25,
    paddingRight: 25,
  },
  button1: {
    color: "white",
    backgroundColor: "#2A3663",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 10,
  },
  button1Color: {
    color: "white",
    fontSize: 20,
  },
  googleAuth: {
    height: 45,
    backgroundColor: "#444",
    color: "white",
  },
});
