import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../lib/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import MapView, { Marker, Polyline } from "react-native-maps";

const myTrips = () => {
  const destination = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: "Golden Gate Bridge",
    tip: "Best visited at midnight in San Francisco",
    picture:
      "https://imgs.search.brave.com/O1GA3ypnvpTCMNyxKm3lwK46ZD64TsK4kIC2pQyYAgw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzM2LzM5Lzk0/LzM2MF9GXzEzNjM5/OTQzMV90UllJb1Qw/eW9pa1hFS3dwdnBU/NnhCREo5cXZ4SE9K/MS5qcGc",
  };
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/home")}
      >
        <AntDesign name="arrowleft" size={24} color="#B59F78" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Going to</Text>
          <Text style={styles.imageText}>{destination.name}</Text>
        </View>
        <Image style={styles.image} source={{ uri: destination.picture }} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: destination.latitudeDelta,
          longitudeDelta: destination.longitudeDelta,
        }}
      ></MapView>
      <View style={styles.tipContainer}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Entypo name="light-bulb" size={24} color="black" />
          <Text style={{ fontWeight: 700, marginHorizontal: 3 }}>TIP:</Text>
        </View>
        <Text style={styles.tipText}>{destination.tip}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#2A3663",
  },
  map: {
    height: 300,

    margin: 20,
  },
  tipContainer: {
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 20,
    width: "90%",
    alignSelf: "center",
  },
  homeButton: {
    position: "absolute",
    top: 5,
    left: 10,
    zIndex: 1,
    backgroundColor: "#D8DBBD",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 5,
  },
  text: {
    fontSize: 15,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
    marginHorizontal: 10,
    fontWeight: "700",
  },
  imageText: {
    fontWeight: "700",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
  },
  tipText: {
    fontFamily: "LeagueSpartan_700Bold",
    fontWeight: "700",
    color: "#B59F78",
    fontSize: 14,
    margin: 6,
  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 130,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
  },
});

export default myTrips;
