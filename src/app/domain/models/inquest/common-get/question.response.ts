import { UUID } from "crypto";
import { TypeQuestionResponse } from "./type.question.response";
import { ResponseResponse } from "./response.response";

export interface QuestionResponse {
    id: UUID;
    typeQuestion: TypeQuestionResponse;
    idInquest: UUID;
    questionn: string;
    createAt: Date;
    responses: ResponseResponse[];
}