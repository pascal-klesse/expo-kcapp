import {KeyboardTypeOptions, StyleSheet, TextInput, View} from "react-native";
import {Control, Controller} from "react-hook-form";
import {theme} from "@/constants/theme";
import React from "react";
import {useFormTextInputStyles} from "@/components/FormTextInput/useFormTextInputStyles";

type Props = {
    control: Control<any>,
    name: string,
    required?: boolean,
    placeholder?: string,
    autoCapitalize?: "none" | "sentences" | "words" | "characters",
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean
}

export default function FormTextInput({control, name, required, placeholder, autoCapitalize, keyboardType, secureTextEntry}: Props) {
    const styles = useFormTextInputStyles();

    return <View style={styles.inputContainer}>
        <Controller
            control={control}
            rules={{
                required,
            }}
            render={({field}) => (
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.colors.muted}
                    placeholder={placeholder}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    {...field}
                />
            )}
            name={name}
        />
    </View>
}
