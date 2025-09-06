import { DebtDTO } from "./debt.dto";
import { PayDTO } from "./pay.dto";

export interface GetAllPaysResponseDTO {
    debt: DebtDTO;
    pays: PayDTO[];
}