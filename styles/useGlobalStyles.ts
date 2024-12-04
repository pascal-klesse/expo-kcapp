import {StyleSheet} from "react-native";
import {theme} from "@/constants/theme";

export const useGlobalStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        formContainer: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
        },
    })
}
