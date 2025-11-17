import {tryCatch} from "@/utils";
import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

type Enums = {
    key: string,
    value: {
        hebrewValue: string,
        id: number
    }[]
}

type Journal = {
    $id: string;
    id: string;
    name: string;
    groupName: string;
    journalEventTypes: {
        "$id": string,
        "journalId": number,
        "eventTypeEnumId": number,
        "updateStatus": number
    }[];
    forceId: number;
    journalTypeId: number;
    location: string;
    creationUser: string;
    lastUpdateUser: string;
    lastUpdateUserDisplayName: string;
    lastUpdateDate: string;
    creationDate: string;
    guidId: string;
    cityId: string;
};

export const getEnums = async () => {
    const [error, result] = await tryCatch<{ data: Array<Enums> }>(axios.get(`${backendBaseUrl}/enums`));
    const [journalsError, journalsResult] = await tryCatch<{data: Array<Journal>}>(axios.get(`${backendBaseUrl}/journals`))

    if (error) throw error
    if (journalsError) throw journalsError

    const {data} = result
    const {data: journals} = journalsResult

    const entries = data.map(({key, value}) => [
        key,
        value.map(({hebrewValue, id}) => ({label: hebrewValue, value: id})),
    ]);

    const journalEntries = journals.map((journal) => {
        return {
            label: `${journal.name} (${journal.id})`,
            value: journal.id,
        };
    });

    return {...Object.fromEntries(entries), ResponsibleJournal: journalEntries};
}