import { Injectable } from "@angular/core";
import { GetAllUsersUseCase } from "../use-cases/user/get.all.users.usecase";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllUsersResponseDTO } from "../../domain/models/user/get.all.users.response.dto";
import { InactivateUserRequestDTO } from "../../domain/models/user/inactivate.user.request.dto";
import { ActivateUserRequestDTO } from "../../domain/models/user/activate.user.request.dto";
import { InactivateUserUseCase } from "../use-cases/user/inactivate.user.usecase";
import { ActivateUserUseCase } from "../use-cases/user/activate.user.usecase";
import { CreateUserUseCase } from "../use-cases/user/create.user.usecase";
import { CreateUserRequestDTO } from "../../domain/models/user/create.user.request.dto";
import { GetAllUsersForCreditorResponseDTO } from "../../domain/models/user/get.all.users.for.creditor.response.dto";
import { UUID } from "crypto";
import { GetAllUsersForCreditorUseCase } from "../use-cases/user/get.all.users.for.creditor.usecase";

@Injectable({ providedIn: 'root' })
export class UserFacade {

  constructor(private create: CreateUserUseCase,
              private getAll: GetAllUsersUseCase,
              private getAllForCreditor: GetAllUsersForCreditorUseCase,
              private inactivate: InactivateUserUseCase,
              private activate: ActivateUserUseCase) {}

  Create = (newUser: CreateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.create.Execute(newUser);

  GetAll = () : Observable<CommonResponse<GetAllUsersResponseDTO>> => 
    this.getAll.Execute();

  GetAllForCreditor = (idDebtor: UUID) : Observable<CommonResponse<GetAllUsersForCreditorResponseDTO>> => 
    this.getAllForCreditor.Execute(idDebtor);

  Inactivate = (inactivateUser: InactivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.inactivate.Execute(inactivateUser);
  
  Activate = (activateUser: ActivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.activate.Execute(activateUser);
}