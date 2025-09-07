import { UUID } from "crypto";

export interface GetAllDebtsResponseDTO {
    debts: DebtDTO[];
}

export interface DebtDTO {
    id: UUID;   
    userDebtor: UserDTO;
    userCreditor: UserDTO;
    amount: number;
    difference: number;
    createAt: Date;
    updateAt: Date;
    isActive: boolean;
    debtsMovements: MovementDTO[];
}

export interface UserDTO {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
}

export interface MovementDTO {
    amount: number;
    createAt: Date;
}