import { LoginResponseDTO } from './../../domain/models/login/login.response.dto';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ILoginRepository } from "../../domain/repositories/ilogin.repository";
import { LoginRequestDTO } from "../../domain/models/login/login.request.dto";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiIAM } from "../../domain/servers/api-iam";

@Injectable({ providedIn: 'root' })
export class LoginRepository implements ILoginRepository {
  private _apiUrl = this.apiIAM.Domain + '/login';

  constructor(private http: HttpClient,
              private apiIAM: ApiIAM) {}

  Auth = (request: LoginRequestDTO) : Observable<CommonResponse<LoginResponseDTO>> => 
    this.http.post<CommonResponse<LoginResponseDTO>>(`${this._apiUrl}/auth`, request);
}