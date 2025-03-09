import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";


export default function Page() {
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


      console.log(days);
    return (
      <View>
        {days.map(([day, activities], index) => (
          <View key={index}>
            <Text>{day}</Text>
            {activities.map((activityId, idx) => {

                const destination = destinations.find((dest) => dest.id === activityId);

                return (
                    <View key={idx}>
                      <Text>Activity ID: {activityId}</Text>
                      {/* If destination is found, show its name, otherwise show 'Unknown Destination' */}
                      <Text>Destination: {destination ? destination.name : "Unknown Destination"}</Text>
                      <Text onPress={() => deleteFrom(activityId,day)}>Delete</Text>
                    </View>
                );

            })}
          </View>
        ))}
      </View>
    );
  }