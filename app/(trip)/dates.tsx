import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";


export default function Dates() {

    const [locations, setLocations] = useState([]);

    
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


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: locations[0]?.cityImage,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.imageText}>Paris</Text>
      </View>
      <View>

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
})
