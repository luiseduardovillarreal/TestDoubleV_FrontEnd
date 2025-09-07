import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { PayRepository } from "../../../infrastructure/repositories/pay.repository";
import { GetAllPaysDebtsResponseDTO } from "../../../domain/models/pay/get.all.pays.debts.response.dto";

@Injectable({ providedIn: 'root' })
export class GetAllPaysDebtsUseCase {

  constructor(private repository: PayRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllPaysDebtsResponseDTO>> => 
    this.repository.GetAll();
}