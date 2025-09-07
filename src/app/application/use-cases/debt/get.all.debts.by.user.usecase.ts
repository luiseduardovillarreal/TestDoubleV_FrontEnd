import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { DebtRepository } from "../../../infrastructure/repositories/debt.repository";
import { UUID } from "crypto";
import { GetAllDebtsByUserResponseDTO } from "../../../domain/models/debt/get.all.debts.by.user.response.dto";

@Injectable({ providedIn: 'root' })
export class GetAllDebtsByUserUseCase {

  constructor(private repository: DebtRepository) {}
  
  Execute = (idDebtor: UUID) : Observable<CommonResponse<GetAllDebtsByUserResponseDTO>> => 
    this.repository.GetAllByUser(idDebtor);
}