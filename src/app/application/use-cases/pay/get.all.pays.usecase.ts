import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllPaysResponseDTO } from "../../../domain/models/pay/get.all.pays.response.dto";
import { PayRepository } from "../../../infrastructure/repositories/pay.repository";

@Injectable({ providedIn: 'root' })
export class GetAllPaysUseCase {

  constructor(private repository: PayRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllPaysResponseDTO>> => 
    this.repository.GetAll();
}