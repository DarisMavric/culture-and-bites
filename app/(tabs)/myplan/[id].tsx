import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../lib/supabase";

const { width } = Dimensions.get("window");

export default function myPlan() {
  const router = useRouter();
  const [data, setData] = useState(null); // Početna vrednost null
  const [days, setDays] = useState([]);
  const [destinations, setDestinations] = useState([]); // Početna vrednost null

  const { id } = useLocalSearchParams();

  useEffect(() => {
    
    if(!id) return null;
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else if (data && data.length > 0) {
        setData(data[0]); // Postavi prvi objekat ako postoji
        console.log(data[0]);
      }
    };

    const fetchDestinations = async () => {
      const { data, error } = await supabase.from("destinations").select("*");

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else if (data && data.length > 0) {
        setDestinations(data); // Postavi prvi objekat ako postoji
      }
    };

    fetchLocations();
    fetchDestinations();
  }, [id]);

  useEffect(() => {
    // Kada se `data` promeni, ažuriraj `days`
    if (!data?.activities?.days) return;

    const allDays = Object.entries(data.activities.days || {});
    setDays(allDays);

  }, [data]);

  const deleteFrom = async (activityId, day) => {
    // Fetch only the activities for the given trip
    const { data: tripData, error } = await supabase
      .from("trips")
      .select("activities")
      .eq("id", id)
      .single(); // Ensures we get a single object instead of an array
  
    if (error) {
      console.error("Error fetching activities:", error);
      Alert.alert("Error", "Failed to load activities.");
      return;
    }
  
    if (!tripData?.activities?.days) {
      console.warn("No activities found for this trip.");
      return;
    }
  
    // Clone current activities and remove the activity
    const updatedDays = { ...tripData.activities.days };
  
    if (updatedDays[day]) {
      updatedDays[day] = updatedDays[day].filter((actId) => actId !== activityId);
  
      // If the day becomes empty, optionally remove it
    }
  
    // Update Supabase with the modified activities
    const { error: updateError } = await supabase
      .from("trips")
      .update({ activities: {days: updatedDays } })
      .eq("id", id);
  
    if (updateError) {
      console.error("Error updating activities:", updateError);
      Alert.alert("Error", "Failed to update activities.");
      return;
    }
  
    // Update local state properly
    setData(prev => ({
      ...prev,
      activities: {
        days: updatedDays
      }
    }));
  
  };
  

  console.log(data);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{uri: data?.photo_url}}
        style={styles.topImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/myTrips")}
        >
          <Ionicons name="arrow-back-outline" color="#B59F78" size={30} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>{data?.title}</Text>
          <Text style={styles.seciondTitle}>Travel Plan</Text>
        </View>
      </ImageBackground>

      <View style={{ padding: 10 }}>
        {days.map(([day, activities], index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 5,
              }}
            >
              <Text style={styles.dayTitle}>{day}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(216, 219, 189)",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Add Activity </Text>
                  <Ionicons name="add" color="rgb(68,68,68)" size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {activities.map((activityId, idx) => {
              const destination = destinations.find(
                (dest) => dest.id === activityId
              );

              return (
                <View style={styles.foodCard} key={idx}>
                  <Image
                    source={
                      destination?.image.startsWith("http")
                        ? { uri: destination?.image }
                        : require("../eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png") // Ako je lokalna
                    }
                    style={styles.foodImage}
                  />

                  <View style={{ flexDirection: "column", width: "100%" }}>
                    <View>
                      <View
                        style={{
                          padding: 5,
                          flexDirection: "row",
                          gap: 3,
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.foodTitle}>
                          {destination?.name}
                        </Text>

                        <TouchableOpacity style={styles.typeStyle}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "white",
                            }}
                          >
                            {destination?.type}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          backgroundColor: "#2A3663F5",
                          padding: 3,
                        }}
                      >
                        <Text style={styles.foodInfo}>
                        {destination?.description.substring(0, 160) + "..."}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        paddingBottom: 10,
                        gap: 5,
                        padding: 5,
                        backgroundColor: "#2A3663F5",
                      }}
                    >
                      <Ionicons
                        name="navigate-outline"
                        size={30}
                        color={"#B59F78"}
                        onPress={() => router.replace(`(tabs)/travelTo/${destination?.id}`)}
                      />
                      <Ionicons
                        name="trash"
                        size={30}
                        color={"#B59F78"}
                        onPress={() => deleteFrom(activityId,day)}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
    marginBottom: 20,
  },

  homeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 50,
  },

  topImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },

  textContainer: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },

  seciondTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#ffffff",
  },

  activityTitle: {
    color: "#2A3663F5",
    fontSize: 16,
    fontWeight: "bold",
  },

  contentStyle: {
    color: "#B59F78",
    fontSize: 16,
    marginTop: 5,
  },

  activityStyle: {
    fontSize: 14,
    color: "#B59F78",
    marginTop: 5,
    flexWrap: "wrap",
    width: "50%",
  },

  activityDiv: {
    flexDirection: "row",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 10,
    padding: 0,
  },

  activityIMG: {
    height: "100%",
    width: "25%",
    overflow: "hidden",
    borderRadius: 10,
    marginRight: 10,
  },

  dayTitle: {
    fontSize: 20,
    paddingLeft: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2A3663",
  },

  foodCard: {
    flexDirection: "row",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  foodImage: {
    width: 100,
    height: "auto",
  },
  foodInfo: {
    flex: 1,
    padding: 3,
    justifyContent: "center",
    color: "#B59F78",
    width: "70%",
  },

  foodTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2A3663",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  foodDescription: {
    fontSize: 12,
    color: "#B59F78",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  typeStyle: {
    backgroundColor: "rgb(238,179,73)",
    padding: 5,
    borderRadius: 20,
  },
});