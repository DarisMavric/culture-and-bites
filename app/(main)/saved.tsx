import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ImageFetcher from "../../components/imageTest";

const saved = () => {

  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Pelivan%2C_Belgrade.jpg';

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6E3" }}>
      <Text>Saved</Text>
        <Text>GO TO DESTINATION</Text>
        <ImageFetcher imageUrl={imageUrl} />
    </View>
  );
};

export default saved;
