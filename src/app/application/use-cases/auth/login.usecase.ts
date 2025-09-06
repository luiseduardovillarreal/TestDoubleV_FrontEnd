import { Injectable } from "@angular/core";
import { LoginRepository } from "../../../infrastructure/repositories/login.repository";
import { LoginResponse } from "../../../domain/models/login/login.response";
import { Observable } from "rxjs";
import { LoginRequest } from "../../../domain/models/login/login.request";
import { CommonResponse } from "../../../domain/models/common.response";

@Injectable({ providedIn: 'root' })
export class LoginUseCase {

  constructor(private repository: LoginRepository) {}

  Execute = (request: LoginRequest) : Observable<CommonResponse<LoginResponse>> => 
    this.repository.Auth(request);
}