import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../../domain/models/login/login.response";
import { HttpClient } from "@angular/common/http";
import { ILoginRepository } from "../../domain/repositories/ilogin.repository";
import { LoginRequest } from "../../domain/models/login/login.request";
import { CommonResponse } from "../../domain/models/common.response";
import { ApiIAM } from "../../domain/servers/api-iam";

@Injectable({ providedIn: 'root' })
export class LoginRepository implements ILoginRepository {
  private _apiUrl = this.apiIAM.Domain + '/login';

  constructor(private http: HttpClient,
              private apiIAM: ApiIAM) {}

  Auth = (request: LoginRequest) : Observable<CommonResponse<LoginResponse>> => 
    this.http.post<CommonResponse<LoginResponse>>(`${this._apiUrl}/auth`, request);
}