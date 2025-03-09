import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Dates() {
  const [locations, setLocations] = useState([]);

  const { session } = useAuth();

  const [who,setWho] = useState('');

  const router = useRouter();

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

  const nextButton = async() => {
    const { data, error } = await supabase
      .from("trips")
      .update([
        {
          type: who,
        }
      ]).eq('user_id', session?.user.id)

    if (error) {
      console.error("Greška pri dodavanju itinerara:", error.message);
    } else {
      console.log("Itinerar uspešno dodat:", data);
      router.replace('(tabs)/tab');
      setWho('');
    }
  }

  console.log(session?.user.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/dates")}
        >
          <Ionicons name="home" color="#B59F78" size={24} />
        </TouchableOpacity>
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
        <Text style={styles.imageText}>Ko Putuje?</Text>
      </View>
      <View style={styles.pick}>
        <TouchableOpacity style={styles.button} onPress={() => setWho('Solo Trip')}>
          <View>
            <Text style={{color: "#444", fontSize: 20,fontFamily: "LeagueSpartan_700Bold"}}>SOLO PUTNIK</Text>
            <Text style={{flex: 1, flexWrap: 'wrap', color: "#444", fontFamily: "LeagueSpartan_700Bold",justifyContent: "center"}}>Idealno za one koji putuju sami</Text>
          </View>
            <Text style={{fontSize: 40}}>🤵</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setWho('Romance Trip')}>
          <View style={{width: '80%',flexShrink: 1,flex: 1}}>
            <Text style={{color: "#444", fontSize: 20,fontFamily: "LeagueSpartan_700Bold"}}>Momak i devojka</Text>
            <Text style={{flex: 1,color: "#444", fontFamily: "LeagueSpartan_700Bold"}}>Savršeno za romantična putovanja.</Text>
          </View>
          <View style={{justifyContent: "center",alignItems: "center"}}>
            <Text style={{fontSize: 40,textAlign: "center"}}>👫</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setWho('Family Trip')}>
          <View style={{width: '80%',flexShrink: 1,flex: 1}}>
            <Text style={{color: "#444", fontSize: 20,fontFamily: "LeagueSpartan_700Bold"}}>Cela porodica</Text>
            <Text style={{flex: 1,color: "#444", fontFamily: "LeagueSpartan_700Bold"}}>Fokus na dečijim atrakcijama, porodičnim restoranima i sigurnim destinacijama</Text>
          </View>
          <View style={{justifyContent: "center",alignItems: "center"}}>
            <Text style={{fontSize: 40,textAlign: "center"}}>👨‍👩‍👧‍👦</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setWho('Friends Trip')}>
          <View style={{width: '80%',flexShrink: 1,flex: 1}}>
            <Text style={{color: "#444", fontSize: 20,fontFamily: "LeagueSpartan_700Bold"}}>Grupa prijatelja</Text>
            <Text style={{flex: 1,color: "#444", fontFamily: "LeagueSpartan_700Bold"}}>Preporuke uključuju zabavne aktivnosti, noćni život i smeštaj pogodan za grupe.</Text>
          </View>
          <View style={{justifyContent: "center",alignItems: "center"}}>
            <Text style={{fontSize: 40,textAlign: "center"}}>👨🏼‍🤝‍👨🏻</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => nextButton()}>
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
  pick: {
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#D8DBBD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 75,
    padding: 10,
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
  nextButton: {
    backgroundColor: "#A6B89F",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 10,
  },
});
