import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { PayRepository } from "../../../infrastructure/repositories/pay.repository";
import { CreatePayDebtRequestDTO } from "../../../domain/models/pay/create.pay.debt.request.dto";

@Injectable({ providedIn: 'root' })
export class CreatePayDebtUseCase {

  constructor(private repository: PayRepository) {}
  
  Execute = (pay: CreatePayDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Create(pay);
}