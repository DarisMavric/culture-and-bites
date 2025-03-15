import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { Destinations } from "../../components/activities";

const search = () => {

      const [destinations, setDestinations] = useState([]);
      const [search,setSearch] = useState('')

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
    
        fetchLocations();
      }, []);

      console.log(search);
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <ScrollView style={{ backgroundColor: "#FAF6E3" }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
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
            </View>
            <View>
                        <View>
                          <Text style={styles.sectionTitle}>🥐 HRANA</Text>
                        </View>
                        {destinations.map((item, index) => {


                            if(item.name.startsWith(search))
            
            
                          return (
                            <View key={index}>
                              <Destinations item={item}/>
                            </View>
                          );
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
