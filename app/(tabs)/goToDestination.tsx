import { useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import * as Location from "expo-location";
import { supabase } from "../../lib/supabase";

export default function MyTrips() {
  const router = useRouter();
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [drivingDuration, setDrivingDuration] = useState(null);
  const [walkingDuration, setWalkingDuration] = useState(null);
  const [destination,setDestination] = useState(null);
  const ORS_API_KEY =
   "5b3ce3597851110001cf62489adc68921fef4853b93a6f7af77aef4d";
  /*const destination = {
    latitude: 43.12884059691567,
    longitude: 20.50539796209354,
    name: "Golden Gate Bridge",
    tip: "Best visited at midnight in San Francisco",
    time: "9:30 AM - 11:00 PM",
    image:
      "https://imgs.search.brave.com/O1GA3ypnvpTCMNyxKm3lwK46ZD64TsK4kIC2pQyYAgw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzM2LzM5Lzk0/LzM2MF9GXzEzNjM5/OTQzMV90UllJb1Qw/eW9pa1hFS3dwdnBU/NnhCREo5cXZ4SE9K/MS5qcGc",
  }; */

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const userLocation = await Location.getCurrentPositionAsync({});
        setOrigin({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      }
    })();
  
    const fetchLocations = async () => {
        const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .limit(1)
        .maybeSingle();
  
      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setDestination(data); // Postavljamo samo jednu destinaciju
      }
    };
  
    fetchLocations();
  }, []);
  
  useEffect(() => {
    if (origin && destination?.longitude && destination?.latitude) {  
      fetchRoute();
      fetchWalkingDuration();
    }
  }, [origin, destination]);
  
  
  useEffect(() => {
    if (mapRef.current && routeCoords.length > 0 && origin && destination?.latitude && destination?.longitude) { // Provera da destination postoji
      const coordinates = [origin, destination, ...routeCoords];
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [routeCoords]);
  
  async function fetchRoute() {
    try {
      if (!origin || !destination || !destination.longitude || !destination.latitude) return;  // Osiguravamo da destination postoji
  
      const bodyData = {
        coordinates: [
          [origin.longitude, origin.latitude],
          [destination.longitude, destination.latitude], // Uklonjen ?. jer smo proverili da destination postoji
        ],
        geometry: true,
        instructions: false,
      };
      
      const response = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ORS_API_KEY,
          },
          body: JSON.stringify(bodyData),
        }
      );
  
      const json = await response.json();
      if (json.routes && json.routes.length > 0) {
        const encoded = json.routes[0].geometry;
        const decoded = polyline.decode(encoded);
        const route = decoded.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(route);
        const durationMinutes = Math.round(json.routes[0].summary.duration / 60);
        setDrivingDuration(durationMinutes);
      }
    } catch (error) {
      console.error("Greška pri dobijanju rute:", error);
    }
  }
  
  async function fetchWalkingDuration() {
    try {
      if (!origin || !destination) return;  // Provera da destination postoji
  
      const bodyData = {
        coordinates: [
          [origin.longitude, origin.latitude],
          [destination.longitude, destination.latitude],
        ],
        geometry: false,
        instructions: false,
      };
  
      const response = await fetch(
        "https://api.openrouteservice.org/v2/directions/foot-walking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ORS_API_KEY,
          },
          body: JSON.stringify(bodyData),
        }
      );
  
      const json = await response.json();
      if (json.routes && json.routes.length > 0) {
        const durationMinutes = Math.round(json.routes[0].summary.duration / 60);
        setWalkingDuration(durationMinutes);
      }
    } catch (error) {
      console.error("Greška pri dobijanju pešačkog vremena:", error);
    }
  }
  console.log(destination);

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
          <Text style={styles.destinationTitle}>Going to:</Text>
          <Text style={styles.imageText}>{destination?.name}</Text>
        </View>
        <Image style={styles.image} source={{ uri: destination?.image }} />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: destination?.latitude,
            longitude: destination?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {origin && (
            <Marker coordinate={origin} title="Your Location" pinColor="blue" />
          )}
          <Marker
            coordinate={{
              latitude: destination?.latitude,
              longitude: destination?.longitude,
            }}
            title="Destination"
            description={destination?.name}
          />
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#2081b1"
              strokeWidth={4}
            />
          )}
        </MapView>
        <View style={styles.durationContainer}>
          <Ionicons name="car-outline" size={20} color="#2A3663" />
          <Text style={styles.durationText}>
            Driving:{" "}
            {drivingDuration ? `${drivingDuration} min` : "Calculating..."}
          </Text>
          <Ionicons
            name="walk-outline"
            size={20}
            color="#2A3663"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.durationText}>
            Walking:{" "}
            {walkingDuration ? `${walkingDuration} min` : "Calculating..."}
          </Text>
        </View>
        <Text style={styles.subtitle}>
          <Text style={{ color: "#2A3663" }}>Destination:</Text>{" "}
          {destination?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Ionicons name="time-outline" size={24} color="#2A3663" />
          <Text style={styles.subtitle}>{destination?.time || "15 minuta"}</Text>
        </View>
      </View>
      <View style={styles.tipContainer}>
        <View style={styles.tipRow}>
          <Entypo name="light-bulb" size={24} color="#2A3663" />
          <Text style={styles.tipLabel}>TIP:</Text>
        </View>
        <Text style={styles.tipText}>{destination?.tip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: { backgroundColor: "#2A3663" },
  map: { height: 300, marginBottom: 20 },
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
  mapContainer: {
    backgroundColor: "#D8DBBD",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
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
  destinationTitle: {
    fontSize: 15,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
    marginHorizontal: 10,
    fontWeight: "700",
  },
  imageText: {
    fontWeight: "700",
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
  },
  tipRow: { alignItems: "center", flexDirection: "row", marginTop: 10 },
  tipLabel: { fontWeight: "700", marginHorizontal: 3 },
  tipText: {
    fontFamily: "LeagueSpartan_700Bold",
    fontWeight: "700",
    color: "#B59F78",
    fontSize: 14,
    marginVertical: 6,
  },
  image: { resizeMode: "cover", opacity: 0.3, width: "100%", height: 130 },
  textContainer: { position: "absolute", bottom: 0 },
  subtitle: {
    fontFamily: "LeagueSpartan_700Bold",
    fontWeight: "700",
    color: "#B59F78",
    fontSize: 16,
    margin: 4,
    marginHorizontal: 10,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 10,
  },
  durationText: {
    fontFamily: "LeagueSpartan_700Bold",
    fontWeight: "700",
    color: "#2A3663",
    fontSize: 16,
  },
});