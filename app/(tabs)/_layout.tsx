import { SafeAreaView, StyleSheet, Text } from "react-native"
import { Slot } from "expo-router"
import "@fontsource/league-spartan";


const RootLayout = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Slot/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FAF6E3",
        fontFamily: "League Spartan",
    },
})

export default RootLayout;