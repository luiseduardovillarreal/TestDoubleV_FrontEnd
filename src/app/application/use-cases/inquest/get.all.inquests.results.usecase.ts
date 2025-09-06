import { Injectable } from "@angular/core";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { Observable } from "rxjs";
import { GetAllInquestsResultsResponse } from "../../../domain/models/inquest/get-results/get.all.inquests.results.response";
import { CommonResponse } from "../../../domain/models/common.response";

@Injectable({ providedIn: 'root' })
export class GetAllInquestsResultsUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllInquestsResultsResponse>> => 
    this.repository.GetAllResults();
}