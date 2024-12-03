import {StyleSheet} from "react-native";
import {theme} from "@/constants/theme";

export const useFormTextInputStyles = () => {
    return StyleSheet.create({
        inputContainer: {
            marginBottom: 16,
        },
        input: {
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 16,
            color: theme.colors.foreground,
            fontSize: 16,
        },
    });
}
