import { Injectable } from "@angular/core";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllUsersForCreditorResponseDTO } from "../../../domain/models/user/get.all.users.for.creditor.response.dto";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class GetAllUsersForCreditorUseCase {

  constructor(private repository: UserRepository) {}
  
  Execute = (idDebtor: UUID) : Observable<CommonResponse<GetAllUsersForCreditorResponseDTO>> => 
    this.repository.GetAllForCreditor(idDebtor);
}