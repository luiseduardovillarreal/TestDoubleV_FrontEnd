import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllDebtsResponseDTO } from "../../domain/models/debt/get.all.debts.response.dto";
import { GetAllDebtsUseCase } from "../use-cases/debt/get.all.debts.usecase";
import { CreateDebtRequestDTO } from "../../domain/models/debt/create.debt.request.dto";
import { CreateDebtUseCase } from "../use-cases/debt/create.debt.usecase";

@Injectable({ providedIn: 'root' })
export class DebtFacade {
    
  constructor(private create: CreateDebtUseCase,
              private getAll: GetAllDebtsUseCase) {}

  Create = (newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.create.Execute(newDebt);

  GetAll = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.getAll.Execute();
}