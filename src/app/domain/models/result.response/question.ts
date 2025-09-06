import { UUID } from "crypto";
import { Response } from "./response";
import { TypeQuestion } from "./type.question";

export interface Question {
    id: UUID;
    typeQuestion: TypeQuestion;
    responses: Response[];
}