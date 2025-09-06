import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllDebtsResponseDTO } from "../../domain/models/debt/get.all.debts.response.dto";
import { GetAllDebtsUseCase } from "../use-cases/debt/get.all.debts.usecase";

@Injectable({ providedIn: 'root' })
export class DebtFacade {
    
  constructor(private getAll: GetAllDebtsUseCase) {}

  GetAll = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.getAll.Execute();
}