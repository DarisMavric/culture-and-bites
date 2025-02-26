import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function Page() {


  const router = useRouter();

  const {session} = useAuth();


  console.log(session);
  

  // Funckija za odjavu
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/signin");
    } else {
      console.log("Sign out error:", error);
    }
  }

  const foodData = [
    {
      title: "Croissant, Paris",
      description:
        "Croissant je jedan od najpoznatijih francuskih peciva. Uživajte u svakom zalogaju!",
      image:
        "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
    },
    {
      title: "Croissant, Paris",
      description:
        "Croissant je jedan od najpoznatijih francuskih peciva. Uživajte u svakom zalogaju!",
      image:
        "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
    },
  ];

  return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Zdravo, Daris</Text>
          <Button title="Log Out" onPress={signOut} />
        </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Istraži Destinacije..."
          style={styles.searchInput}
          placeholderTextColor="#444"
        />
      </View>

      <Text style={styles.sectionTitle}>Preporučeno</Text>

      <View style={styles.recommendedCard}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/4921/b274/f484dbd21c977ec1f30bb12b6dbf30bf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CmEl-pdbZor0K3C-Bd4ju9FxLIgJPMTaM4fhFs1~5r-PZvcCa12kX9qTmTLv~MqRHeiAbGgtMNpn9L-RAnfF976BZKPFjjWxVYsv1Jx0zAW6yNiT7xKsThECdihsNf4Dz7vrkGpc~wlMBPx0Lx6J-TeI5BDKPzNBc4Zmq0hpcpttZ73KibGkuwDAu2kLcT6pN64y5Um0ceX4FiKu7FjkMiqkET1hCd5xQDHzpywINIaFcxZc1VwiXGgGnJPZGBDMIGMbH9bN7RS2CfXLzSIW~5ywb3uavjerbCpAS0n1Hwqhhaw4OHN2SPXWYF7f7MddziGFCx~mI0P3OwNoTfYBAw__",
          }}
          style={styles.recommendedImage}
        />
        <View style={styles.recommendedContent}>
          <View style={styles.tagsRow}>
            <Text style={styles.cityTitle}>Paris</Text>
            <Text style={styles.tag}>Food</Text>
            <Text style={styles.tag}>Culture & Museums</Text>
            <Text style={styles.tag}>Family Trip</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>
              Paris, Francuska – svetski centar umetnosti, mode i kulture.
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>EXPLORE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🥐 HRANA</Text>
      {foodData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.foodCard}
          onPress={() => router.push("(tabs)/foodDetails")}
        >
          <Image source={{ uri: item.image }} style={styles.foodImage} />
          <View style={styles.foodInfo}>
            <Text style={styles.foodTitle}>{item.title}</Text>
            <Text style={styles.foodDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
    padding: 10,
  },
  descriptionView: {
    flex: 1,
    flexDirection: "row",
    width: "auto",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  searchContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8DBBD",
    color: "#444",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
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
  },
  recommendedImage: {
    width: "100%",
    height: 180,
  },
  recommendedContent: {
    padding: 10,
  },
  cityTitle: {
    fontSize: 20,
    paddingRight: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#D8DBBD",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#e8e8e8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#B59F78",
    marginVertical: 8,
    width: "70%",
    fontWeight: "bold",
    textShadowColor: "black", // Stroke color
    textShadowOffset: { width: 2, height: 2 }, // Adjust stroke thickness
    textShadowRadius: 3, // Soften the edges
  },
  exploreButton: {
    backgroundColor: "#A6B89F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  foodCard: {
    flexDirection: "row",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  foodImage: {
    width: 86,
    height: "auto",
  },
  foodInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#2A3663",
  },
  foodDescription: {
    fontSize: 13,
    color: "#B59F78",
    backgroundColor: "#2A3663",
  },

  logoutButton: {
    backgroundColor: "#444",
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
