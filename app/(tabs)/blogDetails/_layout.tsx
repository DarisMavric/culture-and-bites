import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function BlogDetailsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Post",

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#2A3663"
                style={{ marginHorizontal: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
