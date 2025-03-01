import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  LeagueSpartan_700Bold,
} from "@expo-google-fonts/league-spartan";
import { useState } from "react";

export default function Page() {
  let [fontsLoaded] = useFonts({
    LeagueSpartan_700Bold,
  });

  const [selectedButtons, setSelectedButtons] = useState([]);

  const isSelected = (option) => selectedButtons.includes(option);

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
        <Image
          source={{
            uri: "https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-1170x780.jpg",
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
        </View>
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
  }
});
