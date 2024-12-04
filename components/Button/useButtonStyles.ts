import {StyleSheet} from "react-native";
import {theme} from "@/constants/theme";

export const useButtonStyles = () => {
    // todo: const { theme } = useContext(ThemeContext) -> würde Möglichkeit geben für verschiedene Themes

    return StyleSheet.create({
        button: {
            borderRadius: 12,
            padding: 16,
            gap: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 16,
            fontWeight: '600',
        },
        primaryButton: {
            backgroundColor: theme.colors.primary,
        },
        primaryText: {
            color: '#000',
        },
        secondaryButton: {
            backgroundColor: theme.colors.card,
        },
        secondaryText: {
            color: theme.colors.foreground,
        },
    });
}
