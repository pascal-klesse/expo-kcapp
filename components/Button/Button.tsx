import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useButtonStyles} from "@/components/Button/useButtonStyles";

type Props = {
    text: string,
    type: 'primary' | 'secondary',
    onPress: () => void,
    icon?: React.ReactNode,
    disabled?: boolean,
}

export default function Button({text, type, icon, disabled, onPress}: Props) {
    const styles = useButtonStyles();

    return <TouchableOpacity style={[styles.button, styles[`${type}Button`]]} disabled={disabled} onPress={onPress}>
        { icon }
        <Text style={[styles.text, styles[`${type}Text`]]}>{ text }</Text>
    </TouchableOpacity>
}
