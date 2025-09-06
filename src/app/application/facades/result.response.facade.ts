import { Injectable } from "@angular/core";
import { CreateResultResponseUseCase } from "../use-cases/result.response/create.result.response.usecase";
import { CreateResultResponseRequest } from "../../domain/models/result.response/create.result.response.request";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";

@Injectable({ providedIn: 'root' })
export class ResultResponseFacade {
    
  constructor(private create: CreateResultResponseUseCase) {}

  Create = (newResponses: CreateResultResponseRequest) : Observable<CommonResponse<string>> => 
    this.create.Execute(newResponses);
}