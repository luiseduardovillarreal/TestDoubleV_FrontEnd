import { Injectable } from "@angular/core";
import { ValidateTokenInquestUseCase } from "../use-cases/token/validate.token.inquest.usecase";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class TokenFacade {
    
  constructor(private validateInquest: ValidateTokenInquestUseCase) {}

  ValidateTokenInquest = (token: string) : Observable<CommonResponse<UUID>> => 
    this.validateInquest.Execute(token);
}