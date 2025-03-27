import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

export default function Page() {
  const { session } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = await AsyncStorage.getItem("userSession");

      if (sessionData) {
        const session = JSON.parse(sessionData);
        const { data, error } = await supabase.auth.setSession(session);

        if (!error) {
          router.replace("/home");
        } else {
          await AsyncStorage.removeItem("userSession"); // Očisti pokvarene podatke
        }
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;
  if (!session) {
    return <Redirect href={"/getstarted"} />;
  } else {
    return <Redirect href={"/home"} />;
  }

  return (
    <View style={{ backgroundColor: "#FAF6E3", flex: 1 }}>
      <Text>ASDASDSd</Text>
    </View>
  );
}
