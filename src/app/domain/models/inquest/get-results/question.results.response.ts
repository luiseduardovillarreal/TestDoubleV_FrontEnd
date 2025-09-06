import { UUID } from "crypto";
import { ResponseResultsResponse } from "./response.results.response";

export interface QuestionResultsResponse {
    id: UUID;
    questionn: string;
    type: string;   
    createAt: Date;
    responses: ResponseResultsResponse[];
}