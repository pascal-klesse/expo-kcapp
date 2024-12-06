import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {Account, ID, Models} from "react-native-appwrite";
import {AppwriteClient} from "@/api/Appwrite";
import {OAuthProvider} from "appwrite";
import {Alert} from "react-native";
import {router} from "expo-router";
import {useCreatePlayerMutation} from "@/hooks/api/useCreatePlayer";

type AuthContextType = {
    user?: Models.User<Models.Preferences>,
    login: (email: string, password: string) => Promise<void>,
    register: (email: string, password: string, name: string) => Promise<void>,
    logout: () => Promise<void>,
    appleSignIn: () => Promise<void>,
};

export const AuthContext = createContext<AuthContextType>({
    logout: async () => {},
    login: async (email: string, password: string) => {},
    register: async (email: string, password: string) => {},
    appleSignIn: async () => {},
});

export default function AuthContextProvider({children}: PropsWithChildren<{}>) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | undefined>();
    const account = new Account(AppwriteClient);

    const {mutate: createPlayer} = useCreatePlayerMutation();

    useEffect(() => {
        refreshUser();
    }, []);

    const refreshUser = async () => {
        try {
            const user = await account.get();
            setUser(user);
            router.replace('/dashboard');
            return user;
        } catch (error) {
            console.error(error);
            router.replace('/')
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await refreshUser();
        } catch (error) {
            console.error(error);
            Alert.alert('Login Fehler', 'Bitte versuche es später erneut');
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            await account.create(ID.unique(), email, password, name);
            // Todo: maybe better create via admin view
            createPlayer({
                email,
                name
            });
            await login(email, password);
        } catch (error) {
            console.error(error);
            Alert.alert('Register Fehler', 'Bitte versuche es später erneut');
        }
    }

    const logout = async () => {
        try {
            await account.deleteSessions();
            setUser(undefined);
            router.replace('/');
        } catch (error) {
            console.error(error);
            Alert.alert('Register Fehler', 'Bitte versuche es später erneut');
        }
    }

    const appleSignIn = async () => {
        try {
            // Todo: Possible to create player once here as well?
            account.createOAuth2Session(OAuthProvider.Apple);
            await refreshUser();
        } catch (error) {
            console.error(error);
            Alert.alert('Apple Sign In Fehler', 'Bitte versuche es später erneut');
        }
    }

    return <AuthContext.Provider value={{user, login, register, logout, appleSignIn}}>{children}</AuthContext.Provider>
};

