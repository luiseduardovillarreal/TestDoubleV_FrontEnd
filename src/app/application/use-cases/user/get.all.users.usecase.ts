import { Injectable } from "@angular/core";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllUsersResponseDTO } from "../../../domain/models/user/get.all.users.response.dto";

@Injectable({ providedIn: 'root' })
export class GetAllUsersUseCase {

  constructor(private repository: UserRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllUsersResponseDTO>> => 
    this.repository.GetAll();
}