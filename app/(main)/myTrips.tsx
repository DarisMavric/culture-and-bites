import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

const myTrips = () => {
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  const { session } = useAuth();

  useEffect(() => {
    const getTrips = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("user_id", session?.user.id);

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setTrips(data);
      }
    };

    getTrips();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <View
        style={{
          backgroundColor: "#2A3663F5",
          width: "100%",
          height: 150,
          justifyContent: "flex-end",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{
            padding: 16,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#ffffff" }}>
            My Trips
          </Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Button
          title="Kreiraj Novo Putovanje"
          onPress={() => router.replace("(trip)/dates")}
          color={"#B59F78"}
        />
        <View style={{ marginBottom: 10 }} />
        <Button
          title="Kreiraj Novo Putovanje Pomocu Vestacke Inteligencije"
          onPress={() => router.replace("(AI)/addDate")} 
          color={"#2A3663"}
        />
        <View style={{ marginBottom: 10 }} />
        <Button
          title="Krenite Na Putovanje"
          onPress={() => router.replace("(AI)/mapa")}
          color={"#444"}
        />
      </View>

      <View
        style={{
          width: "100%",
          padding: 15,
          paddingBottom: 100,
        }}
      >
        {trips.length > 0
          ? trips.map((trip, index) => (
              <View key={index} style={{ width: "100%", marginTop: 10 }}>
                <View>
                  <ImageBackground
                    source={
                      trip?.photo_url &&
                      typeof trip.photo_url === "string" &&
                      trip.photo_url.startsWith("http")
                        ? { uri: trip.photo_url }
                        : require("../(tabs)/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png")
                    }
                    style={{
                      width: "100%",
                      height: 100,
                    }}
                    imageStyle={{
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        padding: 16,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {trip.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>

                <View
                  style={{
                    backgroundColor: "#D8DBBD",
                    padding: 10,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={30}
                      color="#2A3663F5"
                    />
                    <Text style={{ color: "#B59F78", fontWeight: "bold" }}>
                      {trip.start_date}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {trip.type === "Solo Trip" ? (
                        <Ionicons
                          name="people-outline"
                          size={30}
                          color="#2A3663F5"
                        />
                      ) : (
                        <Ionicons
                          name="person-outline"
                          size={30}
                          color="#2A3663F5"
                        />
                      )}
                      <Text style={{ color: "#B59F78", fontWeight: "bold" }}>
                        {trip.type}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#2A3663F5",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderBottomRightRadius: 10,
                        }}
                        onPress={() =>
                          router.push(`/(tabs)/myplan/${trip?.id}`)
                        }
                      >
                        <Text style={{ color: "#B59F78" }}>See The Plan</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
};

export default myTrips;
