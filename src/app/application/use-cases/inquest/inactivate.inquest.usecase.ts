import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { InactivateInquestRequest } from "../../../domain/models/inquest/inactivate/inactivate.inquest.request";

@Injectable({ providedIn: 'root' })
export class InactivateInquestUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = (inactivateInquest: InactivateInquestRequest) : Observable<CommonResponse<string>> => 
    this.repository.Inactivate(inactivateInquest);
}