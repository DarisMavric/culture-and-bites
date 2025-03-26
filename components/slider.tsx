import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Carousel from "pinar";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

const { width, height } = Dimensions.get("window");

const Slider = () => {

  const [cities,setCities] = useState(null);

  useEffect(() => {
      const fetchCities = async () => {
        const { data, error } = await supabase.from("cities").select("*");
  
        if (error) {
          console.error("Error fetching cities:", error);
          Alert.alert("Error", "Failed to load cities.");
        } else {
          setCities(data);
        }
      };
  
      fetchCities();
    }, []);


  const router = useRouter(); 

  return (
    <View>
      <Carousel showsControls={false} height={510}>
        {cities?.map((city, index) => (
          <View key={index} style={styles.recommendedCard}>
            <Image
              source={{
                uri: city.cityImage,
              }}
              style={[
                styles.recommendedImage,
                { width: width, height: height * 0.3 },
              ]}
            />
            <View style={styles.recommendedContent}>
              <View style={styles.tagsRow}>
                <Text style={styles.cityTitle}>{city?.name}</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>{city?.description}</Text>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => router.replace("/(AI)/createTrip")}
                >
                  <Text style={styles.exploreButtonText}>ISTRAZI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedCard: {
    backgroundColor: "#2A3663",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    marginRight: 5,
  },

  recommendedImage: {
    width: "100%",
    height: height * 0.3,
  },

  recommendedContent: {
    padding: 15,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },

  cityTitle: {
    fontSize: 22,
    paddingRight: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#D8DBBD",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  tag: {
    backgroundColor: "#F5A623BF",
    borderRadius: 8,
    padding: 8,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
    color: "#ffffff",
  },

  descriptionView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  description: {
    fontSize: 14,
    color: "#B59F78",
    marginVertical: 8,
    width: "70%",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  exploreButton: {
    backgroundColor: "#A6B89F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },

  exploreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Slider;
