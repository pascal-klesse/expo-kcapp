import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {Stack} from "expo-router";

export default function AuthStackRouter() {
    const { user } = useContext(AuthContext);
    return <Stack>
        {
            user ? <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            : <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        }
        <Stack.Screen name="+not-found" />
    </Stack>
}
