import { Slot } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";




const RootLayout = () => {
    return (
        <View style={styles.container}>
            <Slot screenOptions={{}}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF6E3",
    }
})

export default RootLayout;