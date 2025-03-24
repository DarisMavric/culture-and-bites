import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../lib/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get("window");

const mockedLocalProducts = [
  {
    id: 2,
    name: "Zlatiborski sir",
    description:
      "Domaći beli sir, često pravljen od nepasterizovanog mleka. Punog ukusa i arome, idealan uz vruć hleb.",
    image:
      "https://s3-alpha-sig.figma.com/img/d10b/90a4/be84fe4d39c0445ff8bcc666681f2c7b?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aFfJqeNgpMRtGuuTxbl1zeqNjvuu5YRtb-5hQ3saD8~4fcMKLBBtUpXB90ee1egwQbOjsMecP-im5rWIfmBoQYAJo09EjmDRHK2ml~hHy0ucD63VN6PwFn8HRr4jjQKev2m1UdWKmx3mvWR2kr0D0-eq0pCu59TRzmkFdSXxMgazMLrld0ivHOsWG9ck0cJenUwghpS04FJzImbJanGODwZeDwzeDKiF198KQ6S~SU~rOo6EG8xi9PBC1ovF03WWwyygEscECgZMOkKSIBfOz-xo0ZtLKHt1ei1hPn92uZ2Qce3ZGUeAX5rOjoSLqQf0ypdDMFtwAn~pxMcFBSPzUg__",
  },
  {
    id: 3,
    name: "Zlatiborski kajmak",
    description:
      "Kremasti mlečni proizvod, nastao odvajanjem masnoće iz kuvanog mleka. Neizostavan dodatak tradicionalnim jelima.",
    image:
      "https://s3-alpha-sig.figma.com/img/984c/9226/95ae27dea84eb9337258650dcb12a483?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rNjw-dtirU~KFoXdebgcraimD7TS9PAYZoVx8OJSIKgh31ugtFGJphatxJI3PwXe-qQ0FyQMvnKJdoY6IjfFx-U7svVMkLj5JB7ZYVPiZTdV1WNvOHqlbw4pdtzJ4jp~AKAgnZS0ng0JkyGgTIwF1IernYO5-cGNbjG19nzcEBdhofvj2qib0NUWXMdknzgC8kLx2kI9RmpYh3TxWxB2CwrCTJDwSrFg82-A2wTxWKnBVq6yC65K-vRhV8Et4SF5eHFalBX2Gtek0IPaqrZ6guWA5BchZeTkFm200DSGe5UdNDmOENjdXpUdLpTD3eObPGpfqy8LO-ceLfO9KgEmtw__",
  },
  {
    id: 4,
    name: "Bagremov med",
    description:
      "Svetliju boju, blag i izuzetno aromatičan med bagrema. Odličan za imunitet i kao prirodni zaslađivač.",

    image:
      "https://s3-alpha-sig.figma.com/img/1d87/4626/ba5fd21ad323641c4b1437ca8add15e6?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gjVjrwb2oqXhjp0TcYjRjwqf5Xlixap4f2Y8FyFn3GogWC6b09DSjk7VkKHxDgLJFlrvi4hWpJjkahbF3UhfzTazFwcXO7fnS3UN3nqZXadPX93~Xkaxxlruq52jjoS17WXjmY~avb6w30HJi1zbiqrsyV73lUIAjl3t3~~5ueb4OkpuHGrGqQlYQFye-THOCMHy6nOHYzM3MZYdvt8qW82p88DliuUBT~u0LVesO3x1H6H7JnuPp1a2SsJCJYceEH2jmIQzGwMdp0DlNlgc-x2iCw5sxJ7t4~Y49KeWgEBdYLurbxK~djw1BwMYHCuX5JDNFZj1cStAJ8Fr5dCovg__", // primer
  },
  {
    id: 5,
    name: "Propolis",
    description:
      "Prirodni antibiotik koji se koristi za jačanje imuniteta i borbu protiv infekcija.",
    image:
      "https://s3-alpha-sig.figma.com/img/d940/d3d7/f5eea5e6eedc50363dd6c94e103d42da?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fBVHfZT3LYsyE3xovScLnjGHgrLylbsObVwRiuUr4U-qX9T-bKWRRYJzZEQNmGt2UYdhAMMdxfH3FxONdAH0OcSdGJpU66kFdYdzAS3bXhm~rODi3T2GhsIz2wfX~DGvtW4Uet4Op72xHJ9kvYn~pwca9wdL0Eo4I3HJAq0mXDSXk9DwiV3NO-QFng5M0QPsH-V1FlFEwA7oYfp84yc~AIVsRWETclwyGGeuvvaLBVaGJ-CpRAvfnD012aW6YqcFlox2H~SmX2W5chp7~K6n24zZ9Jq7nSfCpqC5SZ-rEs9Lx6AxlrYFv6ioohtjtWMiS~IDydx6TIzZt0Ex88td8Q__", // primer
  },
  {
    id: 6,
    name: "Slatko od borovnice",
    description:
      "Tradicionalni slatki namaz pripremljen od svežih borovnica. Služi se uz palačinke ili hleb.",
    image:
      "https://s3-alpha-sig.figma.com/img/929c/b3f5/9834793d97f8dad41464ea2eedd54b7a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HA9sh8AMAFW3wxFkOBGYzJCGN5UFNClXIwWabWHuJi9FGglm5q8SgAzSEFCdBft70rhKXZQHulKguB7Mr~hoIuUXizc0kAflu0x8-yP13DlfXksik48NkSbp3~99Ij2-ctlo~u28fQmlulLUZ36QLCX0VdtwNP4wmmEfuFNcepmYVYHPbyRLd2g7UFxGlkGGLExqzEHb8MMlB81tgzcWUFLId8aHIFSauRtLhI9DLet9FdzV849Vw5yD6bU5C95wf1eUVX2YU4ZA9wH~nmLSr-SZYmtx4T1wwBURWisC2m21ofjTQKSkiUPDj6mkclrCtagICIWrLia50Lq-spAmTg__",
  },
];

export default function LocalProducts() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching locations:", error);
        Alert.alert("Error", "Failed to load locations.");
      } else if (data && data.length > 0) {
        setTripData(data[0]);
      }
    };
    fetchLocations();
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      {/* Gornja slika i naslov */}
      <ImageBackground
        source={{ uri: tripData?.photo_url }}
        style={styles.topImage}
        imageStyle={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" color="#B59F78" size={30} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>
            {tripData?.title || "Loading..."}
          </Text>
          <Text style={styles.sectionSubtitle}>Lokalni Domaći Proizvodi</Text>
        </View>
      </ImageBackground>

      {/* Lista lokalnih proizvoda (mokovana) */}
      <View style={styles.listContainer}>
        {mockedLocalProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>{product.name}</Text>
              <Text style={styles.productDescription}>
                {product.description}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.arrowContainer}
              onPress={() => {
                // Ovde recimo navigacija na detalje proizvoda ako želiš
                // router.push(`/(tabs)/productDetails/${product.id}`)
              }}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Stilovi prilagođeni da liče na prvu sliku
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6E3",
  },
  topImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
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
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#ffffff",
  },
  listContainer: {
    padding: 16,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 16,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  productImage: {
    width: 90,
    height: 90,
  },
  productTextContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A3663",
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: "#D8DBBD",
  },
  productDescription: {
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: "#2A3663",
    padding: 7,
    color: "#B59F78",
  },
  arrowContainer: {
    backgroundColor: "#A6B89F",
    width: 40,
    alignSelf: "stretch",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
