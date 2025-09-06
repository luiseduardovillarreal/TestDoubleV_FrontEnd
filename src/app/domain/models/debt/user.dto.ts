import { UUID } from "crypto";

export interface UserDTO {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
}