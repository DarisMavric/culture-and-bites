import { Slot } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import "@fontsource/league-spartan";



const RootLayout = () => {
    return (
        <View style={styles.container}>
            <Slot/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF6E3",
        fontFamily: "League Spartan"
    }
})

export default RootLayout;