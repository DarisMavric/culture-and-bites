import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Page() {
  const router = useRouter();
  const { session } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [preferences, setPreferences] = useState([]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/signin");
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("destinations").select("*");

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setDestinations(data);
      }
    };

    const fetchUserPreferences = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("preferences")
        .eq("id", session?.user?.id);

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setPreferences(data[0].preferences);
      }
    };

    fetchUserPreferences();
    fetchLocations();
  }, []);

  console.log(destinations);
  console.log(preferences);

  return (
    <SafeAreaProvider>
      <ScrollView
        style={{ backgroundColor: "#FAF6E3" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Zdravo,{" "}
              <Text style={styles.highlight}>
                {session?.user.user_metadata.name}
              </Text>
            </Text>
            <TouchableOpacity onPress={signOut}>
              <FontAwesome name="user" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Istraži Destinacije..."
              style={styles.searchInput}
              placeholderTextColor="#444"
            />
          </View>

          <Text style={styles.sectionTitle}>Preporučeno</Text>
          <View style={styles.recommendedCard}>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/4921/b274/f484dbd21c977ec1f30bb12b6dbf30bf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CmEl-pdbZor0K3C-Bd4ju9FxLIgJPMTaM4fhFs1~5r-PZvcCa12kX9qTmTLv~MqRHeiAbGgtMNpn9L-RAnfF976BZKPFjjWxVYsv1Jx0zAW6yNiT7xKsThECdihsNf4Dz7vrkGpc~wlMBPx0Lx6J-TeI5BDKPzNBc4Zmq0hpcpttZ73KibGkuwDAu2kLcT6pN64y5Um0ceX4FiKu7FjkMiqkET1hCd5xQDHzpywINIaFcxZc1VwiXGgGnJPZGBDMIGMbH9bN7RS2CfXLzSIW~5ywb3uavjerbCpAS0n1Hwqhhaw4OHN2SPXWYF7f7MddziGFCx~mI0P3OwNoTfYBAw__",
              }}
              style={styles.recommendedImage}
            />
            <View style={styles.recommendedContent}>
              <View style={styles.tagsRow}>
                <Text style={styles.cityTitle}>Paris</Text>
                <Text style={styles.tag}>Food</Text>
                <Text style={styles.tag}>Culture & Museums</Text>
                <Text style={styles.tag}>Family Trip</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  Paris, Francuska – svetski centar umetnosti, mode i kulture.
                </Text>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => router.replace("/(trip)/chooseActivities")}
                >
                  <Text style={styles.exploreButtonText}>EXPLORE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.foodContainer}>
            <View>
              <Text style={styles.sectionTitle}>🥐 HRANA</Text>
            </View>
            {destinations.map((item, index) => {
              // Filter based on preferences

              console.log(item);
              if (item.category !== "FOOD" && !preferences?.includes(item.type))
                return null;

              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.foodCard}
                    onPress={() => router.push(`/(tabs)/details/${item?.id}`)}
                  >
                    <Image
                      source={{ uri: item?.image }}
                      style={styles.foodImage}
                    />
                    <View style={styles.foodInfo}>
                      <View style={styles.foodName}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.foodTitle}>{item?.name}, </Text>
                          <Text
                            style={[styles.foodTitle, { color: "#B59F78" }]}
                          >
                            {item?.city}
                          </Text>
                        </View>

                        <TouchableOpacity style={styles.badgeButton}>
                          <Text style={styles.badgeButtonText}>
                            {item.type}
                          </Text>
                        </TouchableOpacity>
                        {item?.isPopular && (
                          <TouchableOpacity style={styles.popularButton}>
                            <Text style={styles.popularButtonText}>
                              POPULAR
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.foodBadges}>
                        <Text style={styles.foodDescription}>
                          {item.description.substring(0, 160) + "..."}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  foodContainer: {
    // flex: 1,
  },
  container: {
    padding: 10,
    paddingTop: Platform.OS === "ios" ? 45 : 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  highlight: {
    color: "#B59F78",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2A3663",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  exploreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
    paddingTop: 10,
    justifyContent: "center",
    // paddingRight: 10,
  },
  foodName: {
    flexDirection: "row",

    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  foodTitle: {
    fontSize: 16,
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
    padding: 4,
  },
  foodBadges: {
    backgroundColor: "#2A3663",

    padding: 5,
    fontWeight: "bold",
    textShadowColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  popularButton: {
    backgroundColor: "#E4C1D9BF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    marginHorizontal: 4,
  },
  popularButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 9,
  },
  badgeButton: {
    backgroundColor: "#F5A623BF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-end",
    marginLeft: 4,
  },
  badgeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 9,
  },
});
