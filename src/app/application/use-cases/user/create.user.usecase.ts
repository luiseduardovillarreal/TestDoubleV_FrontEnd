import { Injectable } from "@angular/core";
import { CommonResponse } from "../../../domain/models/common.response";
import { Observable } from "rxjs";
import { UserRepository } from "../../../infrastructure/repositories/user.repository";
import { CreateUserRequestDTO } from "../../../domain/models/user/create.user.request.dto";

@Injectable({ providedIn: 'root' })
export class CreateUserUseCase {

  constructor(private repository: UserRepository) {}
  
  Execute = (newUser: CreateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.repository.Create(newUser);
}