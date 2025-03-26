import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const NOVI_PAZAR = { latitude: 43.1367, longitude: 20.5123 };
const NIS = { latitude: 43.3209, longitude: 21.8958 };

const restaurants = [
    { name: "Koznik - Tvrdjava, Castle", latitude: 43.47842331109506, longitude: 21.012897317637854 },
    { name: "Nacionalni Park Kopaonik", latitude: 43.27634298955466, longitude: 20.79904813842572 },
    { name: "Restoran C", latitude: 43.3, longitude: 21.5 }
];

const Mapa = () => {
    const [routeCoords, setRouteCoords] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await fetch(
                    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489adc68921fef4853b93a6f7af77aef4d&start=${NOVI_PAZAR.longitude},${NOVI_PAZAR.latitude}&end=${NIS.longitude},${NIS.latitude}`
                );

                const data = await response.json();

                const coordinates = data.features[0].geometry.coordinates.map(coord => ({
                    latitude: coord[1],
                    longitude: coord[0]
                }));

                setRouteCoords(coordinates);
            } catch (error) {
                console.error("Greška pri dobijanju rute:", error);
            }
        };

        fetchRoute();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => router.replace('/(main)/myTrips')}
                    >
                        <Ionicons name="home" color="#B59F78" size={24} />
                </TouchableOpacity>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 43.2,
                    longitude: 21.0,
                    latitudeDelta: 1.5,
                    longitudeDelta: 1.5,
                }}
                provider="google"
            >
                {/* Prikaz rute */}
                {routeCoords.length > 0 && (
                    <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
                )}

                {/* Markeri restorana */}
                {restaurants.map((restoran, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: restoran.latitude,
                            longitude: restoran.longitude,
                        }}
                        title={restoran.name}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
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
});

export default Mapa;
