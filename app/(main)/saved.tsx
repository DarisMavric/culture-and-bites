import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const saved = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <Text>Saved</Text>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/goToDestination")}
      >
        <Text>GO TO DESTINATION</Text>
      </TouchableOpacity>
    </View>
  );
};

export default saved;
