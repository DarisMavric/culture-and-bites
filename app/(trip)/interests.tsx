import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useFonts,
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
  } from '@expo-google-fonts/league-spartan';

export default function Page() {

    let [fontsLoaded] = useFonts({
        LeagueSpartan_100Thin,
        LeagueSpartan_200ExtraLight,
        LeagueSpartan_300Light,
        LeagueSpartan_400Regular,
        LeagueSpartan_500Medium,
        LeagueSpartan_600SemiBold,
        LeagueSpartan_700Bold,
        LeagueSpartan_800ExtraBold,
        LeagueSpartan_900Black,
      });

      
      if(!fontsLoaded){
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
      <View>
        <Text>Paris</Text>
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
    position: 'absolute',
    bottom: 0,
    fontSize: 40,
    margin: 10,
    color: "#D8DBBD",
    fontFamily: "LeagueSpartan_700Bold"

  },
  image: {
    resizeMode: "cover",
    opacity: 0.3,
    width: "100%",
    height: 120,
  },
});
