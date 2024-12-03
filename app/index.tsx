import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Client, Account, OAuthProvider } from 'appwrite';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Initialize Appwrite
const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT')
    .setProject('YOUR_PROJECT_ID');

const account = new Account(client);

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(email, password);
            router.replace('/dashboard');
        } catch (error) {
            Alert.alert('Login Fehler', 'E-Mail oder Passwort falsch');
        } finally {
            setLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        try {
            setLoading(true);
            await account.createOAuth2Session(OAuthProvider.Apple);
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
                    <TextInput
                        style={styles.input}
                        placeholder="E-Mail"
                        placeholderTextColor={theme.colors.muted}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Passwort"
                        placeholderTextColor={theme.colors.muted}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton} 
                    onPress={handleLogin}
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
