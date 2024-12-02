import {createContext, PropsWithChildren, useState} from "react";
import {Account, ID, Models} from "react-native-appwrite";
import {AppwriteClient} from "@/api/Appwrite";

type AuthContextType = {
    user?: Models.User<Models.Preferences>,
    login?: (email: string, password: string) => Promise<void>,
    register?: (email: string, password: string, name: string) => Promise<void>
};

export const AuthContext = createContext<AuthContextType>({});

export default function AuthContextProvider({children}: PropsWithChildren<{}>) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | undefined>();
    const account = new Account(AppwriteClient);


    const login = async (email: string, password: string) => {
        await account.createEmailPasswordSession(email, password);
        setUser(await account.get());
    };

    const register = async (email: string, password: string, name: string) => {
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    }

    return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>
};

