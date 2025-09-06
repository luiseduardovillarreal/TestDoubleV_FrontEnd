import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllDebtsResponseDTO } from "../models/debt/get.all.debts.response.dto";

export interface IDebtRepository {
    GetAll() : Observable<CommonResponse<GetAllDebtsResponseDTO>>;
}