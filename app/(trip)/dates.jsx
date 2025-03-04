import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';  // Importing format from date-fns

export default function Dates() {
  const [locations, setLocations] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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

  // Handle date range selection
  const onDateChange = (date,type) => {
    console.log(date,type)
  };

  return (
    <SafeAreaView style={styles.container}>
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
    paddingBottom: 10,
  },
  imageText: {
    position: "absolute",
    bottom: 0,
    fontSize: 40,
    margin: 10,
    color: "#D8DBBD",
  },
  image: {
    width: "100%",
    height: 120,
    opacity: 0.3,
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
