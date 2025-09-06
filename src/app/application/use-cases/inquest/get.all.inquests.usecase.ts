import { Injectable } from "@angular/core";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllInquestsResponse } from "../../../domain/models/inquest/get-all/get.all.inquests.response";

@Injectable({ providedIn: 'root' })
export class GetAllInquestsUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllInquestsResponse>> => 
    this.repository.GetAll();
}