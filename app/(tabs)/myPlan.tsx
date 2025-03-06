import React from "react";
import {
  View,
  Text,
  ImageBackground,
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

  const data = {
    title: "Paris, France",
    days: [
      {
        dayTitle: "Day 1",
        activities: [
          {
            activitiTitle: "Croissant, Paris (hrana)",
            activityDescription: "Kroasan ",
            activityImage:
              "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
          },

          {
            activitiTitle: "Boulangerie Victorie (Restorani)",
            activityDescription: "Gineste, 12000 Rodez, France",
            activityImage:
              "https://images.pexels.com/photos/1047458/pexels-photo-1047458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
      },

      {
        dayTitle: "Day 2",
        activities: [
          {
            activitiTitle: "Ajfleov Toranj (Lokacije)",
            activityDescription:
              "Simbol Pariza i jedna od najposecenijih turisnickih atrakcija na svetu. Sagradjena 1889. goine za Svetsku izlozbu i prvobitno je trebalo da bude privremena konstrukcija",
            activityImage:
              "./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png",
          },
        ],
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

      <ImageBackground
        source={require("./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png")}
        style={styles.topImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>{data.title}</Text>
          <Text style={styles.seciondTitle}>Travel Plan</Text>
        </View>
      </ImageBackground>

      <View>
        {data.days.map((day) => (
          <View>
            <Text style={styles.dayTitle}>{day.dayTitle}</Text>

            {day.activities.map((activity, index) => (
              <View style={styles.locationDiv} key={index}>
                <View style={styles.locationRight}>
                  <Text style={styles.userNameStyle}>
                    {activity.activitiTitle}
                  </Text>
                  <Text style={styles.adressStyle}>
                    {activity.activityDescription}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
    marginBottom: 20,
  },

  homeButton: {
    padding: 16,
  },

  topImage: {
    width: "100%",
    height: 150,
    justifyContent: "flex-end",
  },

  textContainer: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },

  seciondTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#ffffff",
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

  locationIMG: {
    height: "100%",
    width: "25%",
    overflow: "hidden",
    borderRadius: 10,
    marginRight: 10,
  },

  dayTitle: {
    fontSize: 20,
    paddingLeft: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "#2A3663",
  },
});
