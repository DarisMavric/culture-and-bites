import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../context/AuthContext";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import * as Progress from 'react-native-progress';

export default function Page() {
  const [data, setData] = useState(null);
  const [trip, setTrip] = useState(null);
  const [preferences,setPreferences] = useState(null);
  const [city,setCity] = useState(null);
  const [progress,setProgress] = useState(0)
 
  const router = useRouter();


  const { session } = useAuth();

  const {id} = useLocalSearchParams();


  const apiKey = 'AIzaSyBzy-r0Zwfxtx6WUb3KkMrGVWYxnC_4Wr0';
    const genAI = new GoogleGenerativeAI(apiKey);
  
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };




    useEffect(() => {
        if (!id) return;
    
        const fetchDestinations = async () => {
          const { data, error } = await supabase.from("destinations").select("*");
          if (error) {
            console.error("Error fetching locations:", error);
            Alert.alert("Error", "Failed to load locations.");
          } else {
            setProgress(0.2);
            setData(data);
          }
        };
    
        const fetchTrip = async () => {
          const { data, error } = await supabase.from("trips").select("*").eq("id", id);
          if (error) {
            console.error("Error fetching trip:", error);
            Alert.alert("Error", "Failed to load trip.");
          } else {
            setProgress(0.5);
            setTrip(data[0]); // Očekujemo da vraća niz, uzimamo prvi element
          }
        };
    
        const fetchUserPreferences = async () => {
          const { data, error } = await supabase
            .from("users")
            .select("preferences")
            .eq("id", session?.user?.id);
          if (error) {
            console.error("Error fetching preferences:", error);
            Alert.alert("Error", "Failed to load user preferences.");
          } else {
            setPreferences(data[0]); // Očekujemo da vraća niz, uzimamo prvi element
          }
        };
    
        fetchDestinations();
        fetchTrip();
        fetchUserPreferences();
      }, [id, session?.user?.id]);
    
      useEffect(() => {
        if (!data || !trip || !preferences) return;
    
        const createTrip = async () => {
    
          const kontekst = `
            ${JSON.stringify(data)}
            Koristeći ove podatke, kreiraj mi travel plan od ${trip.start_date} do ${trip.end_date} 
            za grad Beograd, Niš ili Kragujevac na osnovu ovih interesovanja: ${preferences.preferences}.
            Plan treba da bude u JSON formatu i neka se ispisuje u formatu:
            {city: 'Naziv Grada' activities:{ days:{Dan + (broj koji je dan po redu bez datuma): ['odgovarajuci id destinacije']}}}
          `;
    
          try {
            const chatSession = model.startChat({ generationConfig, history: [] });
            const result = await chatSession.sendMessage(kontekst);
            setProgress(0.7);
            console.log("Kreiranje putovanja...");
    
            const parsedResult = JSON.parse(result.response.text());
            fetchCity(parsedResult[0]?.city)
            updateTrip(parsedResult);
          } catch (error) {
            console.error("Error parsing AI response:", error);
            Alert.alert("Error", "Failed to create trip.");
          }
        };
    
        createTrip();
      }, [data, trip, preferences]);

      const fetchCity = async (cityName) => {
        const { data, error } = await supabase.from("cities").select("cityImage").eq('name',cityName);
        if (error) {
          console.error("Error fetching city Image:", error);
          Alert.alert("Error", "Failed to load locations.");
        } 
        if (!data || data.length === 0) {
            console.warn("City image not found for:", cityName);
            return null;
          }
      
          return data[0];
      };

    
    
      // Ažuriranje putovanja
      const updateTrip = async (result) => {
            try {

                const cityData = await fetchCity(result[0]?.city);
                const cityImage = cityData ? cityData.cityImage : null


                const { data, error } = await supabase
                  .from("trips")
                  .update({
                    activities: result[0]?.activities,
                    title: result[0]?.city,
                    photo_url: cityImage,
                  })
                  .eq("id", id);
          
                if (error) {
                  throw new Error(error.message);
                }
          
                setProgress(1.0);
                console.log("Putovanje ažurirano, preusmeravanje na početnu...");
                router.replace("/home");
              } catch (error) {
                console.error("Greška pri update:", error.message);
              }
        
      };

    


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#FAF6E3" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <View style={{flex: 1, alignContent: 'center',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{textAlign: 'center',fontSize: 30, color: '#2A3663',marginBottom: 20}}>Kreiranje Novog Putovanja</Text>
            <Progress.Bar progress={progress} width={300} height={20}/>
        </View>
      </ScrollView>
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
  buttons: {
    position: "absolute",
    bottom: 10,
    right: 5,
    flex: 1,
    flexDirection: 'row'
  },
  nextButton: {
    backgroundColor: "#A6B89F",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    textAlign: 'center',
    margin: 5
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
    flexDirection: "column",
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
});
