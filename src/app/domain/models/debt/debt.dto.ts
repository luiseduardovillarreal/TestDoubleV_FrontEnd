import { UserDTO } from "./user.dto";

export interface DebtDTO {    
    userDebtor: UserDTO;
    userCreditor: UserDTO;
    amount: number;
    difference: number;
    createAt: Date;
    updateAt: Date;
    isActive: boolean;
}