import { View, Text } from "react-native";
import {Link} from "expo-router";

export default function RegisterScreen() {
    return <View>
        <Text>Register Screen</Text>
        <Link href={'../'}>Go to login</Link>
    </View>
}
