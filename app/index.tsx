import { router, useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { Button, Text } from "react-native";

export default function Page() {


    const router = useRouter();

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        router.replace('/signin');
      }

    return (
        <>
        <Text>Dajgi</Text>
        <Button title="Log Out" color="#444" onPress={signOut}/>
        </>
    )
}