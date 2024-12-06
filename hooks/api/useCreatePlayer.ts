import {useMutation} from "@tanstack/react-query";
import {Database} from "@/api/Appwrite";
import {ID, Models} from "react-native-appwrite";
import {Alert} from "react-native";

type Payload = {
    email: string, name?: string
}

export const createPlayer = async (payload: Payload) => {
    return Database.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE,
        'players',
        ID.unique(),
        payload
    )
}

export const useCreatePlayerMutation = () => {
    return useMutation<Models.Document, unknown, Payload>({
        mutationFn: createPlayer,
        onError: error => {
            console.error(error);
            Alert.alert('Fehler', 'Beim Erstellen des Players ist ein Fehler aufgetreten.');
        },
        }
    );
}
