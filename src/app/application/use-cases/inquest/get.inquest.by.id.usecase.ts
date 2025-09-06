import { Injectable } from "@angular/core";
import { InquestRepository } from "../../../infrastructure/repositories/inquest.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetInquestByIdResponse } from "../../../domain/models/inquest/get-by-id/get.inquest.by.id.response";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class GetInquestByIdUseCase {

  constructor(private repository: InquestRepository) {}
  
  Execute = (idInquest: UUID) : Observable<CommonResponse<GetInquestByIdResponse>> => 
    this.repository.GetById(idInquest);
}