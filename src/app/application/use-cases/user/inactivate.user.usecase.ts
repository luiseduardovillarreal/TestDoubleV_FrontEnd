import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { InactivateUserRequestDTO } from "../../../domain/models/user/inactivate.user.request.dto";

@Injectable({ providedIn: 'root' })
export class InactivateUserUseCase {

  constructor(private repository: UserRepository) {}
  
  Execute = (inactivateUser: InactivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Inactivate(inactivateUser);
}