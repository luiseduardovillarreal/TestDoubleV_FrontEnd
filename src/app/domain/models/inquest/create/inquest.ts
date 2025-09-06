import { Question } from "./question";

export interface Inquest {
    title: string;
    description: string;
    thisUniqueResponse: boolean;
    thisOpen: boolean;
    questions: Question[];
}