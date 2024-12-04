import {Text, View} from "react-native";
import React from "react";
import {useDividerStyles} from "@/components/Divider/useDividerStyles";

type Props = {
    text?: string
}

export default function Divider({text}: Props) {
    const styles = useDividerStyles();

    return <View style={styles.divider}>
        <View style={styles.dividerLine}/>
        { text && <Text style={styles.dividerText}>{text}</Text>}
        <View style={styles.dividerLine}/>
    </View>
}
