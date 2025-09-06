import { UUID } from "crypto";

export interface GetAllUsersForCreditorResponseDTO {
    users: UserDTO[];
}

export interface UserDTO {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
}