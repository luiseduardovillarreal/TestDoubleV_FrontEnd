import { UUID } from "crypto";

export interface TokenInquestResponse {
    id: UUID;
    token: string;
}