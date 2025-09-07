export interface GetAllPaysDebtsResponseDTO {
    debt: DebtDTO;
    pays: PayDTO[];
}

export interface DebtDTO {    
    amount: number;
    difference: number;
    createAt: Date;
    updateAt: Date;
    isActive: boolean;
}

export interface PayDTO {
    amount: number;
    createAt: Date;
}