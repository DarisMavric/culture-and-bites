import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Activities } from "../../components/activities";



export default function Page() {

    const [destinations, setDestinations] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selected, setSelected] = useState(null);

    const router = useRouter();

    const { session } = useAuth();

    useEffect(() => {
        const fetchDestinations = async () => {
            const { data, error } = await supabase.from("destinations").select("*");

            if (error) {
                console.error("Error fetching destinations:", error);
                Alert.alert("Error", "Failed to load locations.");
            } else {
                setDestinations(data);
            }
        };

        fetchDestinations();
    }, []);


    const dodajGrad = async () => {
        console.log(selected);
        router.replace(`/chooseHotel?text=${selected}`);
    }

    const tjt = (item) => {
        console.log('ALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log('Clicked item:', item?.name);
        router.replace(`/(tabs)/details/${item?.id}`)
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ backgroundColor: "#FAF6E3" }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
            >
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => router.replace('/home')}
                    >
                        <Ionicons name="home" color="#B59F78" size={24} />
                    </TouchableOpacity>
                    <Image
                        source={{
                            uri: destinations.length > 0 ? destinations[0].cityImage : "https://via.placeholder.com/300",
                        }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.imageBox}>
                        <Text style={{
                            fontSize: 20,
                            color: "#D8DBBD",
                            fontFamily: "LeagueSpartan_700Bold",
                        }}>Paris</Text>
                        <Text style={styles.imageText}>Dodaj Aktivnost</Text>
                    </View>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Istraži Destinacije..."
                        style={styles.searchInput}
                        placeholderTextColor="#444"
                    />
                </View>

                <View style={{ padding: 10 }}>

                    <View>
                        <Text style={styles.sectionTitle}>HRANA</Text>
                        {destinations.map((item, index) => {
                            if (item?.category === "FOOD") {
                                return <Activities item={item} key={index} onPress={() => tjt(item)} />;
                            }
                        })}

                        <Text style={styles.sectionTitle}>Kultura i znamenitosti</Text>
                        {destinations.map((item, index) => {
                            if (item?.category === "Kultura i znamenitosti") {
                                console.log(item)
                                return <Activities item={item} key={index} onPress={() => tjt(item)} />;
                            }
                        })}
                    </View>
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={() => dodajGrad()}>
                    <Text style={{ fontSize: 25, color: "#fff", fontFamily: "LeagueSpartan_700Bold" }}>DALJE</Text>
                </TouchableOpacity>






            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF6E3",
    },
    imageContainer: {
        backgroundColor: "#2A3663",
    },
    imageBox: {
        fontSize: 40,
        margin: 10,
        position: 'absolute',
        bottom: 0,
    },

    imageText: {
        fontSize: 40,
        color: "#D8DBBD",
        fontFamily: "LeagueSpartan_700Bold",
    },
    image: {
        resizeMode: "cover",
        opacity: 0.3,
        width: "100%",
        height: 160,
    },

    homeButton: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 50,
        elevation: 5,
    },
    nextButton: {
        backgroundColor: "#A6B89F",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        right: 10
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#333",
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
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
        paddingTop: 10,
        justifyContent: "center",
        // paddingRight: 10,
    },
    foodName: {
        flexDirection: "row",

        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    foodTitle: {
        fontSize: 16,
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
        padding: 4,
    },
    foodBadges: {
        backgroundColor: "#2A3663",

        padding: 5,
        fontWeight: "bold",
        textShadowColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    popularButton: {
        backgroundColor: "#E4C1D9BF",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "center",
        marginHorizontal: 4,
    },
    popularButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 9,
    },
    badgeButton: {
        backgroundColor: "#F5A623BF",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-end",
        marginLeft: 4,
    },
    badgeButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 9,
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
        flexDirection: "row",
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
})