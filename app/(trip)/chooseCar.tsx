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
import { useAuth } from "../../context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const [data, setData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [cars, setCars] = useState([]);
  const [cityID, setCityID] = useState(null);

  const [selected, setSelected] = useState(null);

  const router = useRouter();

  const { id, text } = useLocalSearchParams();

  const { session } = useAuth();

  useEffect(() => {
    if (id) {
      const fetchTrip = async () => {
        const { data, error } = await supabase
          .from("trips")
          .select("*")
          .eq("id", id);

        if (error) {
          console.error("Greška:", error.message);
        } else {
          setData(data);
          console.log(data);
        }
      };

      const fetchLocations = async () => {
        const { data, error } = await supabase.from("cities").select("*");

        if (error) {
          console.error("Error fetching locations:", error);
          Alert.alert("Error", "Failed to load locations.");
        } else {
          setLocations(data);
        }
      };

      const fetchHotels = async () => {
        const { data, error } = await supabase.from("cars").select("*");

        if (error) {
          console.error("Error fetching locations:", error);
          Alert.alert("Error", "Failed to load locations.");
        } else {
          setCars(data);
        }
      };

      fetchHotels();
      fetchLocations();
      fetchTrip();
    }
  }, [id]);

  const dodajVozilo = async () => {
    if (id) {
      console.log("Who Is Going Trip Id: ", id);
  
      // Update the trip with the new city image and title
      const { data, error } = await supabase
        .from("trips")
        .update([
          {
            rented_car: selected,
          },
        ])
        .eq('id', id)
  
      if (error) {
        console.error("Greška pri update:", error.message);
      } else {

        router.replace(`/myplan/${id}`)
  
        setSelected(null);
      }
    }
  };

  const preskoci = async () => {
    router.replace(`/home`);
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
                locations.length > 0
                  ? locations[0].cityImage
                  : "https://via.placeholder.com/300",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.imageText}>Izaberite Vozilo</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Istraži Hotele..."
            style={styles.searchInput}
            placeholderTextColor="#444"
          />
        </View>

        {cars?.map((car, index) => {
          return (
            <View style={styles.recommendedCard} key={index}>
              <Image
                source={{
                  uri: car?.image,
                }}
                style={styles.recommendedImage}
              />
              <View style={styles.recommendedContent}>
                <View style={styles.tagsRow}>
                  <Text
                    style={styles.cityTitle}
                  >{`${car?.name}`}</Text>
                </View>
                <View style={styles.descriptionView}>
                <Text style={styles.description}>{car?.type}</Text>
                  <Text style={styles.description}><Ionicons name="wallet-outline" size={15}/> {car?.price}</Text>
                  <Text style={styles.description}><Ionicons name="car-outline" size={15}/> {car?.doors}</Text>
                  <TouchableOpacity
                    style={
                      selected === car?.id
                        ? styles.exploreSelectedButton
                        : styles.exploreButton
                    }
                    onPress={() => setSelected(car?.id)}
                  >
                    <Text style={styles.exploreButtonText}>ODABRERI</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.buttons}>
              <TouchableOpacity style={styles.nextButton} onPress={() => preskoci()}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "#fff",
                    fontFamily: "LeagueSpartan_700Bold",
                  }}
                >
                  Preskoci
                </Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => dodajVozilo()}
              >
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
              </View>
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
  },
  imageText: {
    position: "absolute",
    bottom: 0,
    fontSize: 40,
    margin: 10,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold",
  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 120,
  },

  homeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 5,
  },
  buttons: {
    position: "absolute",
    bottom: 10,
    right: 5,
    flex: 1,
    flexDirection: 'row'
  },
  nextButton: {
    backgroundColor: "#A6B89F",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    textAlign: 'center',
    margin: 5
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    margin: 15,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
    color: "#ffffff",
  },
  descriptionView: {
    flex: 1,
    flexDirection: "column",
    width: "auto",
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
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },

  exploreSelectedButton: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  exploreButtonText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
