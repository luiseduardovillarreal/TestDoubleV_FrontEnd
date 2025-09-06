import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllDebtsResponseDTO } from "../../../domain/models/debt/get.all.debts.response.dto";
import { DebtRepository } from "../../../infrastructure/repositories/debt.repository";

@Injectable({ providedIn: 'root' })
export class GetAllDebtsUseCase {

  constructor(private repository: DebtRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.repository.GetAll();
}