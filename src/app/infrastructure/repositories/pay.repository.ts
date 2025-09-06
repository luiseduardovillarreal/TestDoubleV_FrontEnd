import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiMovement } from "../../domain/servers/api-movement";
import { GetAllPaysResponseDTO } from "../../domain/models/pay/get.all.pays.response.dto";
import { IPayRepository } from "../../domain/repositories/ipay.repository";

@Injectable({ providedIn: 'root' })
export class PayRepository implements IPayRepository {
  private _apiUrl = this.apiMovement.Domain + '/pay';

  constructor(private http: HttpClient, 
              private apiMovement: ApiMovement) {}

  GetAll = () : Observable<CommonResponse<GetAllPaysResponseDTO>> => 
    this.http.get<CommonResponse<GetAllPaysResponseDTO>>(`${this._apiUrl}/get-all`);
}