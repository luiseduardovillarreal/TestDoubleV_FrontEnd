import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllPaysDebtsUseCase } from "../use-cases/pay/get.all.pays.debts.usecase";
import { CreatePayDebtUseCase } from "../use-cases/pay/create.pay.debt.usecase";
import { CreatePayDebtRequestDTO } from "../../domain/models/pay/create.pay.debt.request.dto";
import { GetAllPaysDebtsResponseDTO } from "../../domain/models/pay/get.all.pays.debts.response.dto";

@Injectable({ providedIn: 'root' })
export class PayFacade {
    
  constructor(private getAll: GetAllPaysDebtsUseCase,
              private create: CreatePayDebtUseCase) {}

  Create = (newPay: CreatePayDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.create.Execute(newPay);

  GetAll = () : Observable<CommonResponse<GetAllPaysDebtsResponseDTO>> => 
    this.getAll.Execute();
}