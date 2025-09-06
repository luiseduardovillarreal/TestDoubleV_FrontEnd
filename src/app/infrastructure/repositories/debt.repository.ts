import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiMovement } from "../../domain/servers/api-movement";
import { GetAllDebtsResponseDTO } from "../../domain/models/debt/get.all.debts.response.dto";
import { IDebtRepository } from "../../domain/repositories/idebt.repository";
import { CreateDebtRequestDTO } from "../../domain/models/debt/create.debt.request.dto";

@Injectable({ providedIn: 'root' })
export class DebtRepository implements IDebtRepository {
  private _apiUrl = this.apiMovement.Domain + '/debt';

  constructor(private http: HttpClient, 
              private apiMovement: ApiMovement) {}
              
  Create = (newDebt: CreateDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newDebt);

  GetAll = () : Observable<CommonResponse<GetAllDebtsResponseDTO>> => 
    this.http.get<CommonResponse<GetAllDebtsResponseDTO>>(`${this._apiUrl}/get-all`);
}