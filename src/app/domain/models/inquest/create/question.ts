import { Response } from "./response";

export interface Question {
    question: string;
    idTypeQuestion: string;
    responses: Response[];
}