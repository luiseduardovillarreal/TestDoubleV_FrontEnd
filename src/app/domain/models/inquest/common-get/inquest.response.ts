import { UUID } from "crypto";
import { QuestionResponse } from "./question.response";
import { TokenInquestResponse } from "./token.inquest.response";
import { InquestResultResponseMeta } from "./inquest.result.response.meta";

export interface InquestResponse {
    id: UUID;
    title: string;
    description: string;
    thisUniqueResponse: boolean;
    thisOpen: boolean;
    createAt: Date;
    updateAt: Date;
    isActive: boolean;
    url: string;
    tokenInquest: TokenInquestResponse;
    inquestResultsResponsesMetas: InquestResultResponseMeta[];
    questions: QuestionResponse[];
}