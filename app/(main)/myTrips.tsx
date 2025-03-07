import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { supabase } from '../../lib/supabase';

const myTrips = () => {

  const [locations, setLocations] = useState([]);
  
    const router = useRouter();
  
    useEffect(() => {
      const fetchLocations = async () => {
        const { data, error } = await supabase.from("trips").select("*, cities(*)");
  
        if (error) {
          console.error("Error fetching locations:", error);
          Alert.alert("Error", "Failed to load locations.");
        } else {
          setLocations(data);
        }
      };
  
      fetchLocations();
    }, []);

    let activities = { days: {} };

const kreirajItenar = () => {
    const start_date = locations[0].start_date;
    const end_date = locations[0].end_date;

    let currentDate = new Date(start_date);
    let endDate = new Date(end_date);

    let dayCount = 1;

    // Generisanje aktivnosti za svaki dan
    while (currentDate <= endDate) {
        activities.days[`Day${dayCount}`] = []; // Svaki dan ima prazan niz aktivnosti
        currentDate.setDate(currentDate.getDate() + 1);
        dayCount++;
    }
    console.log(activities); // Proveravamo generisani objekat
};

const dodajItenar = async () => {
    // Pre nego što pozovemo funkciju za unos, proveravamo da li je activities pravilno popunjen
    if (Object.keys(activities.days).length === 0) {
        console.error("Nema aktivnosti za unos. Proverite da li ste pozvali kreirajItenar.");
        return;
    }

    const { data, error } = await supabase
        .from('itineraries')
        .insert([
            {
                activities: activities, // Dodajemo objekat aktivnosti u kolonu activities
                trip_id: '8b0a2a7f-7e0d-4c22-9d6a-990bfbade212'
            }
        ])

    // Provera da li je došlo do greške
    if (error) {
        console.error('Greška pri dodavanju itinerara:', error.message);
    } else {
        console.log('Itinerar uspešno dodat:', data);
    }
};


  return (
    <View style={{flex: 1, backgroundColor: "#FAF6E3"}}>
        <Button title='pritisni i ne pitaj' onPress={kreirajItenar}></Button>
        <Button title='pritisni i ne pitaj' onPress={dodajItenar}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default myTrips;