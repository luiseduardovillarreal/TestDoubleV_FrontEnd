import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { ActivateUserRequestDTO } from "../../../domain/models/user/activate.user.request.dto";

@Injectable({ providedIn: 'root' })
export class ActivateUserUseCase {

  constructor(private repository: UserRepository) {}
  
  Execute = (activateUser: ActivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Activate(activateUser);
}