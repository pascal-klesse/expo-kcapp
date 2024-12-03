import {createContext, PropsWithChildren, useState} from "react";
import {Account, ID, Models} from "react-native-appwrite";
import {AppwriteClient} from "@/api/Appwrite";
import {OAuthProvider} from "appwrite";
import {Alert} from "react-native";

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

    const refreshUser = async () => {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            console.error(error);
            Alert.alert('User Refresh Fehler', 'Bitte versuche es später erneut');
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error);
            Alert.alert('Login Fehler', 'Bitte versuche es später erneut');
        }
        await refreshUser();
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            await account.create(ID.unique(), email, password, name);
        } catch (error) {
            console.error(error);
            Alert.alert('Register Fehler', 'Bitte versuche es später erneut');
        }
        await login(email, password);
    }

    const logout = async () => {
        try {
            await account.deleteSessions();
            setUser(undefined);
        } catch (error) {
            console.error(error);
            Alert.alert('Register Fehler', 'Bitte versuche es später erneut');
        }
    }

    const appleSignIn = async () => {
        try {
            account.createOAuth2Session(OAuthProvider.Apple);
        } catch (error) {
            console.error(error);
            Alert.alert('Apple Sign In Fehler', 'Bitte versuche es später erneut');
        }
        await refreshUser();
    }

    return <AuthContext.Provider value={{user, login, register, logout, appleSignIn}}>{children}</AuthContext.Provider>
};

