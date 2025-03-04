import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  LeagueSpartan_700Bold,
} from "@expo-google-fonts/league-spartan";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Page() {
  let [fontsLoaded] = useFonts({
    LeagueSpartan_700Bold,
  });

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [locations, setLocations] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('cities').select('*');

      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        setLocations(data);
      }
    };

    fetchLocations();
  }, []);

  const isSelected = (option) => selectedButtons.includes(option);
  console.log(locations[0]?.name);

  const selected = (value) => {
     setSelectedButtons((prevSelected) => {
      if(prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value)
      } else {
        return [...prevSelected, value]
      }
     })
  }

  if (!fontsLoaded) {
    return <Text>asdasdasd</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => router.push("/home")}
                >
                    <Ionicons name="home" color="#B59F78" size={24} />
              </TouchableOpacity>
        <Image
          source={{
            uri: locations[0]?.cityImage,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.imageText}>Paris</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text style={styles.title}>Hrana i Restorani</Text>
        </View>
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          <TouchableOpacity
            style={[styles.button, isSelected('Kafici') && styles.pressedButton]}
            onPress={() => selected('Kafici')}
          >
            <Text style={styles.pick}>Kafici i Poslasticarnice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isSelected('Restorani') && styles.pressedButton]}
            onPress={() => selected('Restorani')}
          >
            <Text style={styles.pick}>Restorani</Text>
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/dates")}>
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
  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 120,
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
  title: { fontSize: 30, color: "#2A3663",fontFamily: "LeagueSpartan_700Bold",marginBottom: 5,},
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8DBBD",
  },

  pick: {
    fontSize: 15,
    fontFamily: "LeagueSpartan_700Bold",
    color: "#444",
  },

  pressedButton: {
    color: '#fff',
    backgroundColor: "#B59F78"
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
