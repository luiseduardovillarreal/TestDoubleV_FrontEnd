import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiMovement } from "../../domain/servers/api-movement";
import { IPayRepository } from "../../domain/repositories/ipay.repository";
import { GetAllPaysDebtsResponseDTO } from "../../domain/models/pay/get.all.pays.debts.response.dto";
import { CreatePayDebtRequestDTO } from "../../domain/models/pay/create.pay.debt.request.dto";

@Injectable({ providedIn: 'root' })
export class PayRepository implements IPayRepository {
  private _apiUrl = this.apiMovement.Domain + '/pay';

  constructor(private http: HttpClient, 
              private apiMovement: ApiMovement) {}

  Create = (newPay: CreatePayDebtRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newPay);

  GetAll = () : Observable<CommonResponse<GetAllPaysDebtsResponseDTO>> => 
    this.http.get<CommonResponse<GetAllPaysDebtsResponseDTO>>(`${this._apiUrl}/get-all`);
}