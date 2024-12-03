import {Account, Client, ID, Models} from "react-native-appwrite";
import {useState} from "react";
import {OAuthProvider} from "appwrite";

let client: Client;
let account: Account;

client = new Client();
client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM);

account = new Account(client);

export function useAppwrite() {
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);

    async function login(email: string, password: string) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    }

    async function getLoggedInUser() {
        return await account.get();
    }

    async function register(email: string, password: string, name: string) {
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
        setLoggedInUser(await account.get());
    }

    async function logout() {
        await account.deleteSession('current');
        setLoggedInUser(null);
    }

    function appleSignIn() {
        account.createOAuth2Session(OAuthProvider.Apple);
    }

    return {
        loggedInUser,
        login,
        register,
        getLoggedInUser,
        logout,
        appleSignIn,
    };
}