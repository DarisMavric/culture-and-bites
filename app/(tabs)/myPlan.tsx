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
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");

export default function myPlan() {
  const router = useRouter();
const [data, setData] = useState([]); // Početna vrednost null
    const [days, setDays] = useState([]);
    const [destinations, setDestinations] = useState([]); // Početna vrednost null
  
    useEffect(() => {
      const fetchLocations = async () => {
        const { data, error } = await supabase.from("trips").select("activities").eq('id', '3f89b691-f8e4-4f8b-b4f4-352855cf77d6');
  
        if (error) {
          console.error("Error fetching locations:", error);
          Alert.alert("Error", "Failed to load locations.");
        } else if (data && data.length > 0) {
          setData(data); // Postavi prvi objekat ako postoji
          console.log(data);
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
    }, []);

    useEffect(() => {
        // Kada se `data` promeni, ažuriraj `days`
        const allDays = data.flatMap((item) =>
          item.activities?.days ? Object.entries(item.activities.days) : []
        );
        setDays(allDays);
      }, [data]);


      const deleteFrom = async (activityId, day) => {
        // Fetch current data from the trips table
        const { data, error } = await supabase.from("trips").select("activities").eq('id', '3f89b691-f8e4-4f8b-b4f4-352855cf77d6');
      
        if (error) {
          console.error("Error fetching locations:", error);
          Alert.alert("Error", "Failed to load locations.");
        } else if (data && data.length > 0) {
          // Get the current activities
          const activitiesData = data[0].activities;
      
          // Remove the activityId from the specific day's activities
          const updatedDays = { ...activitiesData.days };
      
          if (updatedDays[day]) {
            updatedDays[day] = updatedDays[day].filter(id => id !== activityId); // Remove the activityId from the day
          }
      
          // Update the activities object with the modified days
          const updatedActivities = {
            ...activitiesData,
            days: updatedDays
          };
      
          // Update the trips table with the modified activities
          const { error: updateError } = await supabase
            .from("trips")
            .update({ activities: updatedActivities })
            .eq('id', '3f89b691-f8e4-4f8b-b4f4-352855cf77d6');
      
          if (updateError) {
            console.error("Error updating activities:", updateError);
            Alert.alert("Error", "Failed to update activities.");
          } else {
            // Update the local state with the new data
            setData([{
              ...data[0],
              activities: updatedActivities
            }]);
      
            console.log("Activity deleted successfully.");
          }
        }
      };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png")}
        style={styles.topImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home" color="#B59F78" size={30} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>TJT</Text>
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

              const destination = destinations.find((dest) => dest.id === activityId);

              return (
              <View style={styles.foodCard} key={idx}>
                <Image
                  source={
                    destination?.image.startsWith("http")
                      ? { uri: destination?.image }
                      : require("./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png") // Ako je lokalna
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
                          {destination.type}
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
                        {destination.description}
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
                    <Ionicons name="trash" size={22} color={"#B59F78"} />
                    <Ionicons
                      name="share-social-outline"
                      size={22}
                      color={"#B59F78"}
                    />
                  </View>
                </View>
              </View>
              )
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
