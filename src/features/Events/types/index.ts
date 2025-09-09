import {SendingStatusEnum} from "@/types";

export type Event = {
    event: {
        id: string;
        cityId: number;
        name: string;
        location: { latitude: number, longitude: number };
        startDate: Date;
        responsibleJournal: number;
        status: number;
        generator: number;
        eventType: number;
        isUrbanArea: boolean;

        // optional fields
        description?: string;
        endDate?: Date;
        damageLevel?: number;
        lifeSavingPotential?: number;
        allocatedStatus?: number;
        classification?: number;
        permittedJournal?: string;
        permittedEditingJournalsIds?: string;

        seriousInjuries?: number; // חרדה
        minorInjuries?: number; // קל
        moderateInjuries?: number; // בינוני
        severeInjuries?: number; // קשה
        trappedInjuries?: number; // לכודים
        fatalInjuries?: number; // הרוגים
    }
    address?: string;
    schedulingSendingTime: Date;
    sendingStatus: SendingStatusEnum;
    source: number;
    isVibe?: boolean | null;
}