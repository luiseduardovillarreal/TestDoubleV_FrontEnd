import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { DebtRepository } from "../../../infrastructure/repositories/debt.repository";
import { CreateDebtRequestDTO } from "../../../domain/models/debt/create.debt.request.dto";

@Injectable({ providedIn: 'root' })
export class CreateDebtUseCase {

  constructor(private repository: DebtRepository) {}
  
  Execute = (newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Create(newDebt);
}