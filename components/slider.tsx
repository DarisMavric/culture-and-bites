import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Carousel from "pinar";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Slider = () => {
  const router = useRouter();
  const cards = [
    {
      image:
        "https://s3-alpha-sig.figma.com/img/4921/b274/f484dbd21c977ec1f30bb12b6dbf30bf?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CmEl-pdbZor0K3C-Bd4ju9FxLIgJPMTaM4fhFs1~5r-PZvcCa12kX9qTmTLv~MqRHeiAbGgtMNpn9L-RAnfF976BZKPFjjWxVYsv1Jx0zAW6yNiT7xKsThECdihsNf4Dz7vrkGpc~wlMBPx0Lx6J-TeI5BDKPzNBc4Zmq0hpcpttZ73KibGkuwDAu2kLcT6pN64y5Um0ceX4FiKu7FjkMiqkET1hCd5xQDHzpywINIaFcxZc1VwiXGgGnJPZGBDMIGMbH9bN7RS2CfXLzSIW~5ywb3uavjerbCpAS0n1Hwqhhaw4OHN2SPXWYF7f7MddziGFCx~mI0P3OwNoTfYBAw__",
      title: "Paris",
      tags: ["Food", "Culture & Museums", "Family Trip"],
      description:
        "Paris, Francuska – svetski centar umetnosti, mode i kulture.",
    },
    {
      image:
        "https://www.barcelo.com/guia-turismo/wp-content/uploads/que-visitar-en-barcelona-1.jpg",
      title: "Barcelona",
      tags: ["Sport", "Sea", "Family Trip"],
      description: "Barcelona, Span - neka deskrpicijaaaa mnogo lepo",
    },
    {
      image:
        "https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/02/BELGRADE2C20SERBIA_shutterstock_621933932.jpg",
      title: "Belgrade",
      tags: ["History", "Food", "Sport"],
      description:
        "Belgrade, Serbia - isto neka deskripcija za test, isto mnogo lpeooo",
    },
  ];

  return (
    <View>
      <Carousel showsControls={false} height={510}>
        {cards.map((card, index) => (
          <View key={index} style={styles.recommendedCard}>
            <Image
              source={{
                uri: card.image,
              }}
              style={[
                styles.recommendedImage,
                { width: width, height: height * 0.3 },
              ]}
            />
            <View style={styles.recommendedContent}>
              <View style={styles.tagsRow}>
                <Text style={styles.cityTitle}>{card.title}</Text>
                {card.tags.map((tag, idx) => (
                  <Text key={idx} style={styles.tag}>
                    {tag}
                  </Text>
                ))}
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>{card.description}</Text>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => router.replace("/(AI)/createTrip")}
                >
                  <Text style={styles.exploreButtonText}>EXPLORE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedCard: {
    backgroundColor: "#2A3663",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    marginRight: 5,
  },

  recommendedImage: {
    width: "100%",
    height: height * 0.3,
  },

  recommendedContent: {
    padding: 15,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },

  cityTitle: {
    fontSize: 22,
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
    padding: 8,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
    color: "#ffffff",
  },

  descriptionView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
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
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },

  exploreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Slider;
