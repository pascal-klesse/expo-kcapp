import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {theme} from '@/constants/theme';
import {Ionicons} from '@expo/vector-icons';
import {useForm} from "react-hook-form";
import {AuthContext} from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import FormTextInput from "@/components/FormTextInput/FormTextInput";
import Divider from "@/components/Divider/Divider";
import Headline from "@/components/Headline/Headline";
import {useGlobalStyles} from "@/styles/useGlobalStyles";
import {router, useNavigation} from "expo-router";
import {ValidationMessages} from "@/config/ValidationMessages";

type FormType = {
    email: string,
    password: string
}

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const {login, appleSignIn} = useContext(AuthContext);
    const styles = useGlobalStyles();

    const {control, handleSubmit} = useForm<FormType>();

    async function onSubmit(values: FormType) {
        try {
            setLoading(true);
            await login(values.email, values.password);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Headline type={'h1'} text={'Willkommen zurück'}/>
                <Headline type={'h2'} text={'Melde dich an um fortzufahren'}/>
                <FormTextInput<FormType> control={control}
                                         name={'email'}
                                         placeholder={'E-Mail'}
                                         autoCapitalize={'none'}
                                         keyboardType={'email-address'}
                                         rules={{required: ValidationMessages.required.email}}
                />
                <FormTextInput<FormType> control={control}
                                         name={'password'}
                                         placeholder={'Passwort'}
                                         secureTextEntry
                                         rules={{required: ValidationMessages.required.password}}
                />
                <Button
                    text={loading ? 'Lädt...' : 'Anmelden'}
                    type={'primary'}
                    onPress={handleSubmit(onSubmit)}
                />
                <Divider text={'ODER'}/>
                <View style={{gap: 12}}>
                    <Button
                        text={'Mit Apple fortfahren'}
                        type={'secondary'}
                        icon={<Ionicons name="logo-apple" size={24} color={theme.colors.foreground}/>}
                        onPress={appleSignIn}
                    />
                    <Button
                        text={'Registrieren'}
                        type={'secondary'}
                        icon={<Ionicons name="person-add" size={24} color={theme.colors.foreground}/>}
                        onPress={() => router.push('/register')}
                    />
                </View>
            </View>
        </View>
    );
}
