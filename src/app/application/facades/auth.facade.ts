import { Injectable } from "@angular/core";
import { LoginUseCase } from "../use-cases/auth/login.usecase";
import { LoginResponseDTO } from "../../domain/models/login/login.response.dto";
import { Observable, tap } from "rxjs";
import { LoginRequestDTO } from "../../domain/models/login/login.request.dto";
import { CommonResponse } from "../../domain/models/common.response";
import { LocalStorageService } from "../../infrastructure/services/local.storage.service";

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    
  constructor(private login: LoginUseCase,
              private localStorage: LocalStorageService) {}

  Login = (request: LoginRequestDTO) : Observable<CommonResponse<LoginResponseDTO>> => 
    this.login.Execute(request).pipe(
      tap(auth => this.localStorage.SaveAuth(auth)));
}