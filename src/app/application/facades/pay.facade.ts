import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllPaysResponseDTO } from "../../domain/models/pay/get.all.pays.response.dto";
import { GetAllPaysUseCase } from "../use-cases/pay/get.all.pays.usecase";

@Injectable({ providedIn: 'root' })
export class PayFacade {
    
  constructor(private getAll: GetAllPaysUseCase) {}

  GetAll = () : Observable<CommonResponse<GetAllPaysResponseDTO>> => 
    this.getAll.Execute();
}