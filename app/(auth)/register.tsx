import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {useForm} from "react-hook-form";
import {AuthContext} from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import FormTextInput from "@/components/FormTextInput/FormTextInput";
import Headline from "@/components/Headline/Headline";
import {useGlobalStyles} from "@/styles/useGlobalStyles";
import Divider from "@/components/Divider/Divider";
import {ValidationMessages} from "@/config/ValidationMessages";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {theme} from "@/constants/theme";

type FormType = {
    email: string,
    password: string,
    name: string
}

export default function RegisterScreen() {
    const [loading, setLoading] = useState(false);
    const {register} = useContext(AuthContext);
    const styles = useGlobalStyles();

    const {control, handleSubmit} = useForm<FormType>();

    async function onSubmit(values: FormType) {
        try {
            setLoading(true);
            await register(values.email, values.password, values.name);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Headline type={'h1'} text={'Registrieren'}/>
                <Headline type={'h2'} text={'Fülle das Formular aus, um dich zu registrieren.'}/>
                <FormTextInput<FormType> control={control}
                                         name={'email'}
                                         placeholder={'E-Mail'}
                                         autoCapitalize={'none'}
                                         keyboardType={'email-address'}
                                         rules={{required: ValidationMessages.required.email}}
                />
                <FormTextInput<FormType> control={control}
                                         name={'name'}
                                         placeholder={'Name'}
                                         rules={{required: ValidationMessages.required.name}}
                />
                <FormTextInput<FormType> control={control}
                                         name={'password'}
                                         placeholder={'Passwort'}
                                         secureTextEntry
                                         rules={{required: ValidationMessages.required.password}}
                />
                <Button
                    text={loading ? 'Lädt...' : 'Registrieren'}
                    type={'primary'}
                    onPress={handleSubmit(onSubmit)}
                />
                <Divider/>
                <Button
                    text={'Zurück zum Login'}
                    type={'secondary'}
                    icon={<Ionicons name="arrow-back" size={24} color={theme.colors.foreground}/>}
                    onPress={router.back}
                />
            </View>
        </View>
    );
}
