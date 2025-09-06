import { Injectable } from "@angular/core";
import { LoginRepository } from "../../../infrastructure/repositories/login.repository";
import { LoginResponseDTO } from "../../../domain/models/login/login.response.dto";
import { Observable } from "rxjs";
import { LoginRequestDTO } from "../../../domain/models/login/login.request.dto";
import { CommonResponse } from "../../../domain/models/common.response";

@Injectable({ providedIn: 'root' })
export class LoginUseCase {

  constructor(private repository: LoginRepository) {}

  Execute = (request: LoginRequestDTO) : Observable<CommonResponse<LoginResponseDTO>> => 
    this.repository.Auth(request);
}