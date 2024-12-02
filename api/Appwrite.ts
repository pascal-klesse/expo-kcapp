import {Client} from "react-native-appwrite";

export const AppwriteClient = new Client().setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

