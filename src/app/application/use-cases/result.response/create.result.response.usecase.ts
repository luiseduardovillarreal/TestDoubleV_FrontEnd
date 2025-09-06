import { Injectable } from "@angular/core";
import { ResultResponseRepository } from "../../../infrastructure/repositories/result.response.repository";
import { CreateResultResponseRequest } from "../../../domain/models/result.response/create.result.response.request";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";

@Injectable({ providedIn: 'root' })
export class CreateResultResponseUseCase {

  constructor(private repository: ResultResponseRepository) {}
  
  Execute = (newResponses: CreateResultResponseRequest) : Observable<CommonResponse<string>> => 
    this.repository.Create(newResponses);
}