import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { CreateInquestRequest } from "../../../domain/models/inquest/create/create.inquest.request";

@Injectable({ providedIn: 'root' })
export class CreateInquestUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = (newInquest: CreateInquestRequest) : Observable<CommonResponse<string>> => 
    this.repository.Create(newInquest);
}