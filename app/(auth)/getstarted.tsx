import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("./43b0b0ef53ba4170bb9b268f16d3b6b3.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={styles.buttonText}>Počni</Text>
        </TouchableOpacity>
        <Text style={styles.link}>
          Već imate kreiran nalog?{" "}
          <Text
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/signin")}
          >
            Prijavi se
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 30,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "rgb(216,219,189)",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    boxShadow: "0px 0px 10px #333333",
  },
  buttonText: {
    color: "rgb(181,159,120)",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  link: {
    marginTop: 10,
    color: "rgb(181,159,120)",
    fontWeight: "bold",
    fontSize: 14,
  },
  loginButton: {
    color: "rgb(29,50,92)",
    fontSize: 16,
  },
});
