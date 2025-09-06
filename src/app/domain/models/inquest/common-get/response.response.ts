import { UUID } from "crypto";

export interface ResponseResponse {
    id: UUID;
    idQuestion: UUID;
    response: string;
    createAt: Date;
    isSelected: boolean;
}