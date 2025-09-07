import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiMovement } from "../../domain/servers/api-movement";
import { GetAllDebtsResponseDTO } from "../../domain/models/debt/get.all.debts.response.dto";
import { IDebtRepository } from "../../domain/repositories/idebt.repository";
import { CreateDebtRequestDTO } from "../../domain/models/debt/create.debt.request.dto";
import { GetAllDebtsByUserResponseDTO } from "../../domain/models/debt/get.all.debts.by.user.response.dto";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class DebtRepository implements IDebtRepository {
  private _apiUrl = this.apiMovement.Domain + '/debt';

  constructor(private http: HttpClient, 
              private apiMovement: ApiMovement) {}
              
  Create = (newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newDebt);

  Delete = (idDebt: UUID) : Observable<CommonResponse<string>> => 
    this.http.delete<CommonResponse<string>>(`${this._apiUrl}/delete?idDebt=${idDebt}`);

  GetAll = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.http.get<CommonResponse<GetAllDebtsResponseDTO>>(`${this._apiUrl}/get-all`);

  GetAllByUser = (idDebtor: UUID) : Observable<CommonResponse<GetAllDebtsByUserResponseDTO>> => 
    this.http.get<CommonResponse<GetAllDebtsByUserResponseDTO>>(
      `${this._apiUrl}/get-all-by-user?idDebtor=${idDebtor}`);
}