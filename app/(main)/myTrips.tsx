import { useRouter } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const myTrips = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <Text>Saved</Text>
      <View>
        <TouchableOpacity onPress={() => router.push("(tabs)/myPlan")}>
          <Text style={{ marginTop: 20 }}>My Plans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default myTrips;
