import { Injectable } from "@angular/core";
import { TokenRepository } from "../../../infrastructure/repositories/token.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class ValidateTokenInquestUseCase {

  constructor(private repository: TokenRepository) {}
  
  Execute = (token: string) : Observable<CommonResponse<UUID>> => 
    this.repository.ValidateTokenInquest(token);
}