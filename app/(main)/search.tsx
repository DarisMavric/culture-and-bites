import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Cities, Destinations } from "../../components/activities";
import CategorySelectionModal from "../../components/CategorySelectionModal";
import { Ionicons } from "@expo/vector-icons";

const search = () => {

  const [destinations, setDestinations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('')


  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const handleSelect = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase.from("destinations").select("*");

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else {
        setDestinations(data);
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

    fetchDestinations();
    fetchLocations();
  }, []);

  console.log(search);
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <ScrollView
        style={{ backgroundColor: "#FAF6E3" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              Pretraga
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Istraži Destinacija i Gradove..."
              style={styles.searchInput}
              placeholderTextColor="#444"
              onChangeText={setSearch}
            />

          <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text><Ionicons name="filter-outline" size={30}/></Text>
            </TouchableOpacity>
          </View>
          <View>

            <CategorySelectionModal
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
              onSelect={handleSelect}
            />

            <View>
              <View>
                <Text style={styles.sectionTitle}>Gradovi</Text>
              </View>
              {locations.map((item, index) => {


                if (item.name.startsWith(search) || selectedCategories.includes(item.type))


                  return (
                    <View key={index}>
                      <Cities item={item} />
                    </View>
                  );
              })}
            </View>
            <View>
              <Text style={styles.sectionTitle}>🍽 Hrana i Restorani</Text>
            </View>
            {destinations.map((item, index) => {
              const isMatchingCategory = item.name.startsWith(search) && item.category === "Hrana i Restorani";
              const shouldShow = !selectedCategories || selectedCategories.length < 1 || selectedCategories.includes(item.type)

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

              const isMatchingCategory = item.name.startsWith(search) && item.category === "Kultura i znamenitosti"
              const shouldShow = !selectedCategories || selectedCategories.length < 1 || selectedCategories.includes(item.type)

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

              const isMatchingCategory = item.name.startsWith(search) && item.category === "Aktivnosti i doživljaji"
              const shouldShow = !selectedCategories || selectedCategories.length < 1 || selectedCategories.includes(item.type)

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
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create(({
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
}))

export default search;
