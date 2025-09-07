import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { DebtRepository } from "../../../infrastructure/repositories/debt.repository";
import { ActivateDebtRequestDTO } from "../../../domain/models/debt/activate.debt.request.dto";

@Injectable({ providedIn: 'root' })
export class ActivateDebtUseCase {

  constructor(private repository: DebtRepository) {}
  
  Execute = (activateDebt: ActivateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Activate(activateDebt);
}