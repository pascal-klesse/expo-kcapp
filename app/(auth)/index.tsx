import {View, Text} from "react-native";
import {Link} from "expo-router";

export default function LoginScreen() {
    return <View>
        <Text>Login</Text>
        <Link href={'./register'}>Go to register</Link>
    </View>
}
