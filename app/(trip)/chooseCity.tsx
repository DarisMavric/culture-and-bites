import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";



export default function Page() {

  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selected, setSelected] = useState(null);

  const router = useRouter();

  const { session } = useAuth();

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("cities").select("*");

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setLocations(data);
      }
    };

    fetchLocations();
  }, []);


  const dodajGrad = async () => {
    console.log(selected);
    router.replace(`/chooseHotel?text=${selected}`);
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#FAF6E3" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/home')}
        >
          <Ionicons name="home" color="#B59F78" size={24} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: locations.length > 0 ? locations[0].cityImage : "https://via.placeholder.com/300",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.imageText}>Izaberite Grad</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Istraži Gradove..."
            style={styles.searchInput}
            placeholderTextColor="#444"
          />
        </View>

        {locations?.map((location, index) => {
          return (
            <View style={styles.recommendedCard} key={index}>
              <Image
                source={{
                  uri: location?.cityImage,
                }}
                style={styles.recommendedImage}
              />
              <View style={styles.recommendedContent}>
                <View style={styles.tagsRow}>
                  <Text style={styles.cityTitle}>{`${location?.name},${location?.country}`}</Text>
                  <Text style={styles.tag}>Food</Text>
                  <Text style={styles.tag}>Culture & Museums</Text>
                  <Text style={styles.tag}>Family Trip</Text>
                </View>
                <View style={styles.descriptionView}>
                  <Text style={styles.description}>
                    {location?.description.substring(0, 50) + '...'}
                  </Text>
                  <TouchableOpacity style={selected?.includes(location?.name) ? styles.exploreSelectedButton : styles.exploreButton} onPress={() => setSelected(location?.name)}>
                    <Text style={styles.exploreButtonText}>ODABRERI</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}

        <View style={styles.buttons}>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => dodajGrad()}
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






      </ScrollView>
    </SafeAreaView>
  )
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

  buttons: {
    position: "absolute",
    bottom: 10,
    right: 5,
    flex: 1,
    flexDirection: 'row'
  },

  homeButton: {
    position: 'absolute',
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
  nextButton: {
    backgroundColor: "#A6B89F",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 10
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
    flexDirection: "row",
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
})