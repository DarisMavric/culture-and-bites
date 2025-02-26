import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function FoodDetails() {
  const router = useRouter();

  const foodData = {
    title: "Croissant, Paris",
    description:
      "Croissant je jedan od najpoznatijih francuskih peciva. Uživajte u svakom zalogaju!",
    image:
      "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
    rate: 5,
    comments: [
      {
        userIMG:
          "https://images.pexels.com/photos/30873846/pexels-photo-30873846/free-photo-of-black-and-white-portrait-of-a-young-man.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        userNAME: "Neko Nekic",
        commentContent: "Odlicno!!!",
        rate: 5,
      },
      {
        userIMG:
          "https://images.pexels.com/photos/15670747/pexels-photo-15670747/free-photo-of-man-wearing-suit-holding-hands-in-pockets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        userNAME: "Branko Lazic",
        commentContent: "Okeej :/",
        rate: 3,
      },
    ],
    locations: [
      {
        locationIMG:
          "https://images.pexels.com/photos/1047458/pexels-photo-1047458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        locationName: "Boulangerie Victorie",
        locationAdress: "32 Av. de la Gineste, 120000 Redez, France",
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/home")}
      >
        <Ionicons name="home" color="#B59F78" size={24} />
      </TouchableOpacity>

      <View>
        <Image source={{ uri: foodData.image }} style={styles.foodImage} />
        <Text style={styles.title}>{foodData.title}</Text>
        <Text style={styles.rate}>Ocena: {foodData.rate}</Text>
        <View style={styles.descriptionDiv}>
          <Text style={styles.description}>{foodData.description}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Gde mozete probati</Text>

        {foodData.locations.map((location, index) => (
          <View style={styles.locationDiv} key={index}>
            <Image
              source={{
                uri: location.locationIMG,
              }}
              style={styles.locationIMG}
            />
            <View style={styles.locationRight}>
              <Text style={styles.userNameStyle}>{location.locationName}</Text>
              <Text style={styles.adressStyle}>{location.locationAdress}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ marginBottom: 50 }}>
        <Text style={styles.sectionTitle}>Utisci o proizvodu</Text>

        <View>
          {foodData.comments.map((comment, index) => (
            <View style={styles.commentDiv} key={index}>
              <View>
                <Image
                  source={{
                    uri: comment.userIMG,
                  }}
                  style={styles.userIMGStyle}
                />
              </View>

              <View style={styles.rightStyle}>
                <View style={styles.upStyle}>
                  <Text style={styles.userNameStyle}>{comment.userNAME}</Text>
                </View>
                <Text style={styles.contentStyle}>
                  {comment.commentContent}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAF6E3",
    marginBottom: 20,
  },
  foodImage: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 16, color: "white" },
  descriptionDiv: {
    backgroundColor: "#2A3663F5",
    padding: 10,
    borderRadius: 10,
  },
  homeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 5,
  },
  rate: { fontSize: 16, marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A3663F5",
    marginTop: 10,
  },

  userIMGStyle: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  commentDiv: {
    backgroundColor: "#D8DBBD",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    padding: 10,
  },

  upStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightStyle: {
    padding: 10,
  },

  userNameStyle: {
    color: "#2A3663F5",
    fontSize: 16,
    fontWeight: "bold",
  },

  contentStyle: {
    color: "#B59F78",
    fontSize: 16,
    marginTop: 5,
  },

  adressStyle: {
    fontSize: 14,
    color: "#B59F78",
    marginTop: 5,
    flexWrap: "wrap",
    width: "90%",
  },

  locationIMG: {
    height: "100%",
    width: "25%",
    overflow: "hidden",
    borderRadius: 10,
    marginRight: 10,
  },

  locationDiv: {
    flexDirection: "row",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
    alignItems: "center",
    marginTop: 10,
  },

  locationRight: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    width: "70%",
  },
});
