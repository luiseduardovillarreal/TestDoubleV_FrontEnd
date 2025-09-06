import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { ReactivateInquestRequest } from "../../../domain/models/inquest/reactivate/reactivate.inquest.request";

@Injectable({ providedIn: 'root' })
export class ReactivateInquestUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = (reactivateInquest: ReactivateInquestRequest) : Observable<CommonResponse<string>> => 
    this.repository.Reactivate(reactivateInquest);
}