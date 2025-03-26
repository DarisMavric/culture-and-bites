import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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
import { Destinations } from "../../components/activities";
import Slider from "../../components/slider";

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
          <View>
            <Slider />
          </View>
          <View style={styles.foodContainer}>
            <View>
              <Text style={styles.sectionTitle}>🍽 Hrana i Restorani</Text>
            </View>
            {destinations.map((item, index) => {
              const isMatchingCategory = item.category === "Hrana i Restorani";
              const shouldShow = preferences.includes(item.type)

              if (isMatchingCategory && shouldShow) {
                return (
                  <View key={index}>
                    <Destinations item={item} />
                  </View>
                );
              }

              return null;
            })}
          </View>

          <View>
            <View>
              <Text style={styles.sectionTitle}>🏛 Kultura i znamenitosti</Text>
            </View>
            {destinations.map((item, index) => {

              const isMatchingCategory = item.category === "Kultura i znamenitosti"
              const shouldShow = preferences.includes(item.type)

              if (isMatchingCategory && shouldShow) {
                return (
                  <View key={index}>
                    <Destinations item={item} />
                  </View>
                );
              }

              return null;
            })}
          </View>

          <View>
            <View>
              <Text style={styles.sectionTitle}>🎭 Aktivnosti i doživljaji</Text>
            </View>
            {destinations.map((item, index) => {

              const isMatchingCategory = item.category === "Aktivnosti i doživljaji"
              const shouldShow = preferences.includes(item.type)

              if (isMatchingCategory && shouldShow) {
                return (
                  <View key={index}>
                    <Destinations item={item} />
                  </View>
                );
              }

              return null;
            })}
          </View>
        </View>
      </ScrollView >
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
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
  foodContainer: {},
});
