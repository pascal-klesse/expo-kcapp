import {useHeadlineStyles} from "@/components/Headline/useHeadlineStyles";
import {Text} from "react-native";
import React from "react";

type Props = {
    type: 'h1' | 'h2',
    text: string
}

export default function Headline({text, type}: Props) {
    const styles = useHeadlineStyles();
    return <Text style={styles[type]}>{text}</Text>
}
