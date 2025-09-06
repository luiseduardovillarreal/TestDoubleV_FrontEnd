import { Injectable } from "@angular/core";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class ValidateIsActiveInquestUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = (idInquest: UUID) : Observable<CommonResponse<boolean>> => 
    this.repository.ValidateIsActive(idInquest);
}