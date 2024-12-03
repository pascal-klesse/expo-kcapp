import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {theme} from '@/constants/theme';
import {Ionicons} from '@expo/vector-icons';
import {InferType, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AuthContext} from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import FormTextInput from "@/components/FormTextInput/FormTextInput";
import Divider from "@/components/Divider/Divider";
import Headline from "@/components/Headline/Headline";
import {useGlobalStyles} from "@/styles/useGlobalStyles";
import {router, useNavigation} from "expo-router";

const formSchema = object({
    email: string().email({
        message: 'Please enter a valid email address.',
    }).required({
        message: 'Email is required.',
    }),
    name: string().email({
        message: 'Please enter a valid name.',
    }).required({
        message: 'Name is required.',
    }),
    password: string().min(5, {
        message: 'Password must be at least 5 characters.',
    }).required(),
});

export default function RegisterScreen() {
    const [loading, setLoading] = useState(false);
    const {register} = useContext(AuthContext);
    const styles = useGlobalStyles();

    const {control, handleSubmit, formState: {errors}} = useForm<InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        },
    });

    async function onSubmit(values: InferType<typeof formSchema>) {
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
                <FormTextInput control={control}
                               name={'email'}
                               placeholder={'E-Mail'}
                               autoCapitalize={'none'}
                               keyboardType={'email-address'}
                               required
                />
                <FormTextInput control={control}
                               name={'name'}
                               placeholder={'Name'}
                               required
                />
                <FormTextInput control={control}
                               name={'password'}
                               placeholder={'Passwort'}
                               secureTextEntry
                               required
                />
                <Button
                    text={loading ? 'Lädt...' : 'Registrieren'}
                    type={'primary'}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    );
}
