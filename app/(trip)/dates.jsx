import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import CalendarPicker from 'react-native-calendar-picker';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Dates() {
  const [locations, setLocations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const dodajItenar = async () => {
    if (!startDate || !endDate) {
      Alert.alert("Greška", "Molimo izaberite početni i krajnji datum.");
      return;
    }

    let activities = { days: {} };
    let currentDate = new Date(startDate);
    let finalDate = new Date(endDate);
    let dayCount = 1;

    while (currentDate <= finalDate) {
      activities.days[`Day${dayCount}`] = [];
      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }

    console.log("Generisan itinerar:", activities);

    try {
      const { data, error } = await supabase
        .from("trips")
        .insert([
          {
            start_date: startDate,
            end_date: endDate,
            activities: activities,
            user_id: session?.user.id,
          }
        ]).select();
  
      if (error) {
        throw new Error(error.message); // Throw error for handling
      }
  
      console.log("Itinerar uspešno dodat:", data);
  
      // Navigate to the newly created trip
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Itinerar podaci:", data[0]);
  
        router.replace(`(trip)/whoIsGoing/${data[0].id}`)
      } else {
        console.error("Greška: Nema ID-a u podacima.");
        Alert.alert("Greška", "Došlo je do greške prilikom kreiranja itinerara.");
      }
    } catch (err) {
      console.error("Greška pri dodavanju itinerara:", err.message);
      Alert.alert("Greška", `Došlo je do greške: ${err.message}`);
    }
  };

  // Handle date range selection
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);
    } else if (type === "END_DATE") {
      setEndDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.imageText}>Datum</Text>
      </View>
      <View style={styles.calendarContainer}>
        <CalendarPicker 
          onDateChange={onDateChange} 
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: "#B59F78"
          }}
          selectedDayTextColor={{
            color: "#fff"
          }} 
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => dodajItenar()}>
          <Text style={{fontSize: 25,color: "#fff", fontFamily: "LeagueSpartan_700Bold"}}>DALJE</Text>
      </TouchableOpacity>
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
  calendarContainer: {
    flex: 1,
    paddingTop: 20,
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
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
  }
});
