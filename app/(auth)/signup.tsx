import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@fontsource/league-spartan";
import { supabase } from "../../lib/supabase";
import React, { useState } from 'react'
import { Link } from "expo-router";


export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        },
      },
    })

    console.log('session: ', session);
    console.log('error: ', error);
    setLoading(false)
  }

  return (
    <View>
      <Image style={styles.ImageStyle} source={require("./test.webp")} />
      <View style={styles.welcome}>
        <Text style={styles.WelcomeText}>Welcome To Culture & Bites</Text>
        <Text style={styles.WelcomeTextUnder}>
          Ulogujte se ili kreirajte novi nalog
        </Text>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Enter Your Name"
          placeholderTextColor="#D8DBBD" 
        />
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="#D8DBBD" 
        />
        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="#D8DBBD" 
        />
      </View>
      <Text><Link href="/signin">Already Have An Account</Link></Text>
      <View style={styles.buttons}>
        <TouchableOpacity>
            <View style={styles.button1}>
                <Text style={styles.button1Color} disabled={loading} onPress={() => signUpWithEmail()}>Sign Up</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 20
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
    height:45,
    backgroundColor: "#444",
    color: "white"
  }
});
