import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, Text, View } from "react-native"
import { StyleSheet, TouchableOpacity } from "react-native"



export const Activities = ({ item, onPress }) => {

    const router = useRouter();


    return (
        <TouchableOpacity
            style={styles.foodCard}
            onPress={onPress}
        >
            <Image source={{ uri: item?.image }} style={styles.foodImage} />
            <View style={styles.foodInfo}>
                <View style={styles.foodName}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.foodTitle}>{item?.name},</Text>
                        <Text style={[styles.foodTitle, { color: "#B59F78" }]}>
                            {item?.city}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.badgeButton}>
                        <Text style={styles.badgeButtonText}>{item?.type}</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.foodBadges}>
                    <Text style={styles.foodDescription}>
                        {item?.description.substring(0, 160) + "..."}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Destinations = ({ item }) => {

    const router = useRouter()

    return (
        <TouchableOpacity
            style={styles.foodCard}
            onPress={() => router.push(`/(tabs)/details/${item?.id}`)}
        >
            <Image
                source={{ uri: item?.image }}
                style={styles.foodImage}
            />
            <View style={styles.foodInfo}>
                <View style={styles.foodName}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.foodTitle}>{item?.name}, </Text>
                        <Text
                            style={[styles.foodTitle, { color: "#B59F78" }]}
                        >
                            {item?.city}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.badgeButton}>
                        <Text style={styles.badgeButtonText}>
                            {item.type}
                        </Text>
                    </TouchableOpacity>
                    {item?.isPopular && (
                        <TouchableOpacity style={styles.popularButton}>
                            <Text style={styles.popularButtonText}>
                                POPULAR
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.foodBadges}>
                    <Text style={styles.foodDescription}>
                        {item.description.substring(0, 160) + "..."}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Cities = ({ item }) => {

    const router = useRouter()

    return (
        <TouchableOpacity
            style={styles.foodCard}
            onPress={() => router.push(`/(tabs)/details/${item?.id}`)}
        >
            <Image
                source={{ uri: item?.cityImage }}
                style={styles.foodImage}
            />
            <View style={styles.foodInfo}>
                <View style={styles.foodName}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.foodTitle}>{item?.name}, </Text>
                        <Text
                            style={[styles.foodTitle, { color: "#B59F78" }]}
                        >
                            {item?.country}
                        </Text>
                    </View>

                    {item?.isPopular && (
                        <TouchableOpacity style={styles.popularButton}>
                            <Text style={styles.popularButtonText}>
                                POPULAR
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.foodBadges}>
                    <Text style={styles.foodDescription}>
                        {item.description.substring(0, 160) + "..."}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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
    imageText: {
        position: "absolute",
        bottom: 0,
        fontSize: 40,
        margin: 10,
        color: "#D8DBBD",
        fontFamily: "LeagueSpartan_700Bold",
    },
    image: {
        resizeMode: "cover",
        opacity: 0.3,
        width: "100%",
        height: 120,
    },

    homeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        marginBottom: 20,
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
})