import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase";

export default function Page() {
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState(null);
  const { params } = useLocalSearchParams();
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase.from("destinations").select("*");
      if (error) {
        console.error("Error fetching destinations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setDestinations(data);
      }
    };
    fetchDestinations();
  }, []);

  const dodajGrad = async () => {
    if (!selected) {
      Alert.alert("Molimo odaberite aktivnost.");
      return;
    }
    const tripId = params[0];
    const dayKey = params[1];
    const { data: tripData, error: tripError } = await supabase
      .from("trips")
      .select("activities")
      .eq("id", tripId)
      .single();
    if (tripError) {
      Alert.alert("Error", "Failed to fetch trip data.");
      return;
    }
    let activities = tripData.activities;
    if (!activities) {
      activities = { days: { Day1: [], Day2: [], Day3: [], Day4: [] } };
    }
    if (!activities.days[dayKey]) {
      activities.days[dayKey] = [];
    }
    activities.days[dayKey].push(selected);
    const { error: updateError } = await supabase
      .from("trips")
      .update({ activities })
      .eq("id", tripId);
    if (updateError) {
      Alert.alert("Error", "Failed to update trip.");
      return;
    }
    router.replace(`/(main)/myTrips`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#FAF6E3" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/home")}
        >
          <Ionicons name="home" color="#B59F78" size={24} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                destinations.length > 0
                  ? destinations[0].image
                  : "https://via.placeholder.com/300",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>Izaberite Aktivnost</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Istraži Destinacije..."
            style={styles.searchInput}
            placeholderTextColor="#444"
          />
        </View>
        {destinations.map((item, index) => (
          <View style={styles.recommendedCard} key={index}>
            <Image
              source={{ uri: item?.image }}
              style={styles.recommendedImage}
            />
            <View style={styles.recommendedContent}>
              <View style={styles.tagsRow}>
                <Text
                  style={styles.cityTitle}
                >{`${item?.name}, ${item?.city}`}</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {item?.description
                    ? item.description.substring(0, 50) + "..."
                    : ""}
                </Text>
                <TouchableOpacity
                  style={
                    selected === item?.id
                      ? styles.exploreSelectedButton
                      : styles.exploreButton
                  }
                  onPress={() => setSelected(item?.id)}
                >
                  <Text style={styles.exploreButtonText}>ODABRERI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.nextButton} onPress={dodajGrad}>
          <Text
            style={{
              fontSize: 25,
              color: "#fff",
              fontFamily: "LeagueSpartan_700Bold",
            }}
          >
            DALJE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
  },
  imageContainer: {
    backgroundColor: "#2A3663",
    position: "relative",
  },
  imageBox: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  imageText: {
    fontSize: 40,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 160,
  },
  homeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  searchContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8DBBD",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 10,
  },
  recommendedCard: {
    backgroundColor: "#2A3663",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  recommendedImage: {
    width: "100%",
    height: 180,
  },
  recommendedContent: {
    padding: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  cityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D8DBBD",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#B59F78",
    fontWeight: "bold",
    width: "70%",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  exploreButton: {
    backgroundColor: "#A6B89F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  exploreSelectedButton: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  exploreButtonText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#A6B89F",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 10,
  },
});
