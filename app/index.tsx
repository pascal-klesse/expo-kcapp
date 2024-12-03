import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {InferType, object, string} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppwrite} from "@/hooks/useAppwrite";

const formSchema = object({
    email: string().email({
        message: 'Please enter a valid email address.',
    }).required({
        message: 'Email is required.',
    }),
    password: string().min(5, {
        message: 'Password must be at least 5 characters.',
    }).required(),
});

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const {login, appleSignIn} = useAppwrite();

    const {control, handleSubmit, formState: {errors}} = useForm<InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    async function onSubmit(values: InferType<typeof formSchema>) {
        try {
            setLoading(true);
            await login(values.email, values.password);
            router.replace('/dashboard');
        } catch (error) {
            Alert.alert('Login Fehler', 'E-Mail oder Passwort falsch');
        } finally {
            setLoading(false);
        }
    }

    const handleAppleSignIn = async () => {
        try {
            appleSignIn();
            router.replace('/dashboard');
        } catch (error) {
            Alert.alert('Apple Sign In Fehler', 'Bitte versuche es später erneut');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Willkommen zurück</Text>
                <Text style={styles.subtitle}>Melde dich an um fortzufahren</Text>
                
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="E-Mail"
                                placeholderTextColor={theme.colors.muted}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                {...field}
                            />
                        )}
                        name="email"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Passwort"
                                placeholderTextColor={theme.colors.muted}
                                secureTextEntry
                                {...field}
                            />
                        )}
                        name="password"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton} 
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    <Text style={styles.primaryButtonText}>
                        {loading ? 'Lädt...' : 'Anmelden'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ODER</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity 
                    style={styles.appleButton} 
                    onPress={handleAppleSignIn}
                    disabled={loading}
                >
                    <Ionicons name="logo-apple" size={24} color={theme.colors.foreground} />
                    <Text style={styles.appleButtonText}>Mit Apple fortfahren</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.foreground,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.muted,
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 16,
        color: theme.colors.foreground,
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
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
    appleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 16,
        gap: 8,
    },
    appleButtonText: {
        color: theme.colors.foreground,
        fontSize: 16,
        fontWeight: '600',
    },
});
