import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Slot, useRouter } from "expo-router";
import { supabase } from "../lib/supabase"; // Adjust path as needed

const RootLayout = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        router.push("/signin");
      } else {
        router.replace('/');
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default RootLayout;
