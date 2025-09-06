import { UUID } from "crypto";
import { QuestionResultsResponse } from "./question.results.response";

export interface InquestResultsResponse {
    id: UUID;
    title: string;
    description: string;
    createAt: Date;
    questions: QuestionResultsResponse[];
}