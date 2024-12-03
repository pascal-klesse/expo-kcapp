import {StyleSheet} from "react-native";
import {theme} from "@/constants/theme";

export const useDividerStyles = () => {
    return StyleSheet.create({
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 24,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.colors.border,
        },
        dividerText: {
            color: theme.colors.muted,
            paddingHorizontal: 16,
            fontSize: 14,
        },
    })
}
