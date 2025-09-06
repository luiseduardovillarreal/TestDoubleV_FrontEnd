import { UUID } from "crypto";

export interface CreateDebtRequestDTO {
    debt: DebtDTO;
}

export interface DebtDTO {
    idUserDebtor: UUID;
    idUserCreditor: UUID;
    amount: number;
    difference: number;
}