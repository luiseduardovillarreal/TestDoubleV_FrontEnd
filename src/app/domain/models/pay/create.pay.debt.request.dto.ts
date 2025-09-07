import { UUID } from "crypto";

export interface CreatePayDebtRequestDTO {
    pay: PayDebtDTO;
}

export interface PayDebtDTO {
    idDebt: UUID;
    amount: number;
}