import { UUID } from "crypto";

export interface GetAllUsersResponseDTO {
    users: UserDTO[];
}

export interface UserDTO {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
    createAt: Date;
    updateAt: Date;
    isActive: Date;
}