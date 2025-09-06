import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllDebtsResponseDTO } from "../models/debt/get.all.debts.response.dto";
import { CreateDebtRequestDTO } from "../models/debt/create.debt.request.dto";

export interface IDebtRepository {
    Create(newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>>;
    GetAll() : Observable<CommonResponse<GetAllDebtsResponseDTO>>;
}