import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function myPlan() {
  const router = useRouter();

  const data = {
    title: "Paris, France",
    days: [
      {
        dayTitle: "Day 1",
        activities: [
          {
            activitiTitle: "Croissant, Paris ",
            type: "hrana",
            activityDescription: "Kroasan ",
            activityImage:
              "https://s3-alpha-sig.figma.com/img/ad69/007d/c4d898e1f34d2c4e6d4c85c7871715fd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Vghb5xOCdwNJOABZPow36-UV5ppZIx~16nfyw~wHTfVM7y6GfXcmiVJQtRlrveGSLE-bDv-wtXOxIK8D9JrXP1SD96pz76Vz95UwJqoke6qEtA9LWwwk3AGgu97NoJS4N7yNPF51DbQYHDj9vMK8SG3Cij1IFv48AqDjvzc3yXA~O4ZWsHvPbc-X0MXQH7ij55v6XE-a5C0OOMQeWzM5cocggh7PmHXPRHInttcZtpH9APULyiDJ1iFFCf89yCH5iwMKcowFlEmyXH7Qo59Kvtj~D9aE7cN4OlxKF72VtvLAy4RN~ZAENB3c1vKT7U6M3y~M5srriA2Qg~qocTew__",
          },

          {
            activitiTitle: "Boulangerie Victorie",
            type: "restorani",
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
            activitiTitle: "Ajfleov Toranj",
            type: "lokacija",
            activityDescription:
              "Simbol Pariza i jedna od najposecenijih turisnickih atrakcija na svetu.",
            activityImage:
              "./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png",
          },
        ],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png")}
        style={styles.topImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home" color="#B59F78" size={30} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>{data.title}</Text>
          <Text style={styles.seciondTitle}>Travel Plan</Text>
        </View>
      </ImageBackground>

      <View style={{ padding: 10 }}>
        {data.days.map((day) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 5,
              }}
            >
              <Text style={styles.dayTitle}>{day.dayTitle}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(216, 219, 189)",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Add Activity </Text>
                  <Ionicons name="add" color="rgb(68,68,68)" size={20} />
                </View>
              </TouchableOpacity>
            </View>

            {day.activities.map((activity, index) => (
              <View style={styles.foodCard} key={index}>
                <Image
                  source={
                    activity.activityImage.startsWith("http")
                      ? { uri: activity.activityImage }
                      : require("./eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde 8.png") // Ako je lokalna
                  }
                  style={styles.foodImage}
                />

                <View style={{ flexDirection: "column", width: "100%" }}>
                  <View>
                    <View
                      style={{
                        padding: 5,
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.foodTitle}>
                        {activity.activitiTitle}
                      </Text>

                      <TouchableOpacity style={styles.typeStyle}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                          }}
                        >
                          {activity.type}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#2A3663F5",
                        padding: 3,
                      }}
                    >
                      <Text style={styles.foodInfo}>
                        {activity.activityDescription}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      paddingBottom: 10,
                      gap: 5,
                      padding: 5,
                      backgroundColor: "#2A3663F5",
                    }}
                  >
                    <Ionicons name="trash" size={22} color={"#B59F78"} />
                    <Ionicons
                      name="share-social-outline"
                      size={22}
                      color={"#B59F78"}
                    />
                  </View>
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
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 50,
  },

  topImage: {
    width: "100%",
    height: 200,
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

  activityTitle: {
    color: "#2A3663F5",
    fontSize: 16,
    fontWeight: "bold",
  },

  contentStyle: {
    color: "#B59F78",
    fontSize: 16,
    marginTop: 5,
  },

  activityStyle: {
    fontSize: 14,
    color: "#B59F78",
    marginTop: 5,
    flexWrap: "wrap",
    width: "50%",
  },

  activityDiv: {
    flexDirection: "row",
    backgroundColor: "#D8DBBD",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 10,
    padding: 0,
  },

  activityIMG: {
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
    width: 100,
    height: "auto",
  },
  foodInfo: {
    flex: 1,
    padding: 3,
    justifyContent: "center",
    color: "#B59F78",
    width: "70%",
  },

  foodTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2A3663",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  foodDescription: {
    fontSize: 12,
    color: "#B59F78",
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  typeStyle: {
    backgroundColor: "rgb(238,179,73)",
    padding: 5,
    borderRadius: 20,
  },
});
