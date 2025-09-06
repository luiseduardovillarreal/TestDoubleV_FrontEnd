import { UUID } from "crypto";
import { Question } from "./question";

export interface CreateResultResponseRequest {
    idInquest: UUID;
    token: string;
    questions: Question[];
    latitude: number;
    longitude: number;
    ipResponse: string | undefined;
}