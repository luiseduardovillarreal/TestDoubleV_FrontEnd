import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllPaysResponseDTO } from "../models/pay/get.all.pays.response.dto";

export interface IPayRepository {
    GetAll() : Observable<CommonResponse<GetAllPaysResponseDTO>>;
}