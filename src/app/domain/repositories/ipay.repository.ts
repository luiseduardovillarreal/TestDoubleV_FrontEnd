import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllPaysDebtsResponseDTO } from "../models/pay/get.all.pays.debts.response.dto";

export interface IPayRepository {
    GetAll() : Observable<CommonResponse<GetAllPaysDebtsResponseDTO>>;
}