import {StyleSheet} from "react-native";
import {theme} from "@/constants/theme";

export const useHeadlineStyles = () => {
    return StyleSheet.create({
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.colors.foreground,
            marginBottom: 8,
        },
        h2: {
            fontSize: 16,
            color: theme.colors.muted,
            marginBottom: 32,
        },
    })
}
