import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllDebtsResponseDTO } from "../../domain/models/debt/get.all.debts.response.dto";
import { GetAllDebtsUseCase } from "../use-cases/debt/get.all.debts.usecase";
import { CreateDebtRequestDTO } from "../../domain/models/debt/create.debt.request.dto";
import { CreateDebtUseCase } from "../use-cases/debt/create.debt.usecase";
import { UUID } from "crypto";
import { GetAllDebtsByUserResponseDTO } from "../../domain/models/debt/get.all.debts.by.user.response.dto";
import { GetAllDebtsByUserUseCase } from "../use-cases/debt/get.all.debts.by.user.usecase";
import { DeleteDebtUseCase } from "../use-cases/debt/delete.debt.usecase";
import { ActivateDebtRequestDTO } from "../../domain/models/debt/activate.debt.request.dto";
import { ActivateDebtUseCase } from "../use-cases/debt/activate.debt.usecase";

@Injectable({ providedIn: 'root' })
export class DebtFacade {
    
  constructor(private activate: ActivateDebtUseCase,
              private create: CreateDebtUseCase,
              private d_elete: DeleteDebtUseCase,
              private getAll: GetAllDebtsUseCase,
              private getAllByUser: GetAllDebtsByUserUseCase) {}

  Activate = (activateDebt: ActivateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.activate.Execute(activateDebt);

  Create = (newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.create.Execute(newDebt);

  Delete = (idDebt: UUID) : Observable<CommonResponse<string>> => 
    this.d_elete.Execute(idDebt);

  GetAll = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.getAll.Execute();

  GetAllByUser = (idDebtor: UUID) : Observable<CommonResponse<GetAllDebtsByUserResponseDTO>> => 
    this.getAllByUser.Execute(idDebtor);
}