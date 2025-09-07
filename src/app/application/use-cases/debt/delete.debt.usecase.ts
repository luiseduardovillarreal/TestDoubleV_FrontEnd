import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { DebtRepository } from "../../../infrastructure/repositories/debt.repository";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class DeleteDebtUseCase {

  constructor(private repository: DebtRepository) {}
  
  Execute = (idDebt: UUID) : Observable<CommonResponse<string>> => 
    this.repository.Delete(idDebt);
}