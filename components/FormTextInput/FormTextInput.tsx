import {KeyboardTypeOptions, Text, TextInput, View} from "react-native";
import {Control, FieldValues, useController, UseControllerProps} from "react-hook-form";
import {theme} from "@/constants/theme";
import React from "react";
import {useFormTextInputStyles} from "@/components/FormTextInput/useFormTextInputStyles";

type Props = {
    placeholder?: string,
    autoCapitalize?: "none" | "sentences" | "words" | "characters",
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
}

export default function FormTextInput<T extends FieldValues>({
                                          control,
                                          name,
                                          placeholder,
                                          autoCapitalize,
                                          keyboardType,
                                          secureTextEntry,
                                          rules
                                      }: UseControllerProps<T> & Props) {
    const styles = useFormTextInputStyles();
    const {field, fieldState: {error}} = useController({
        name,
        control,
        rules
    });

    return <View style={styles.inputContainer}>
        <TextInput
            {...field}
            onChangeText={field.onChange}
            value={field.value}
            style={styles.input}
            placeholderTextColor={theme.colors.muted}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
        />
        { error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
}
