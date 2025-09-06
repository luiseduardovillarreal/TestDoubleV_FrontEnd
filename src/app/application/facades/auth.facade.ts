import { Injectable } from "@angular/core";
import { LoginUseCase } from "../use-cases/auth/login.usecase";
import { LoginResponse } from "../../domain/models/login/login.response";
import { Observable, tap } from "rxjs";
import { LoginRequest } from "../../domain/models/login/login.request";
import { CommonResponse } from "../../domain/models/common.response";
import { LocalStorageService } from "../../infrastructure/services/local.storage.service";

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    
  constructor(private login: LoginUseCase,
              private localStorage: LocalStorageService) {}

  Login = (request: LoginRequest) : Observable<CommonResponse<LoginResponse>> => 
    this.login.Execute(request).pipe(
      tap(auth => this.localStorage.SaveAuth(auth)));
}