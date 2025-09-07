import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllDebtsResponseDTO } from "../models/debt/get.all.debts.response.dto";
import { CreateDebtRequestDTO } from "../models/debt/create.debt.request.dto";
import { UUID } from "crypto";
import { GetAllDebtsByUserResponseDTO } from "../models/debt/get.all.debts.by.user.response.dto";

export interface IDebtRepository {
    Create(newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>>;
    Delete(idDebt: UUID) : Observable<CommonResponse<string>>;
    GetAll() : Observable<CommonResponse<GetAllDebtsResponseDTO>>;
    GetAllByUser(idDebtor: UUID) : Observable<CommonResponse<GetAllDebtsByUserResponseDTO>>;
}