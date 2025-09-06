import { Injectable } from "@angular/core";
import { IUserRepository } from "../../domain/repositories/iuser.repository";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllUsersResponseDTO } from "../../domain/models/user/get.all.users.response.dto";
import { InactivateUserRequestDTO } from "../../domain/models/user/inactivate.user.request.dto";
import { ActivateUserRequestDTO } from "../../domain/models/user/activate.user.request.dto";
import { ApiIAM } from "../../domain/servers/api-iam";
import { CreateUserRequestDTO } from "../../domain/models/user/create.user.request.dto";
import { GetAllUsersForCreditorResponseDTO } from "../../domain/models/user/get.all.users.for.creditor.response.dto";
import { UUID } from "crypto";

@Injectable({ providedIn: 'root' })
export class UserRepository implements IUserRepository {
  private _apiUrl = this.apiIAM.Domain + '/user';

  constructor(private http: HttpClient,
              private apiIAM: ApiIAM) {}

  Create = (newUser: CreateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newUser);

  GetAll = () : Observable<CommonResponse<GetAllUsersResponseDTO>> => 
    this.http.get<CommonResponse<GetAllUsersResponseDTO>>(`${this._apiUrl}/get-all`);

  GetAllForCreditor = (idDebtor: UUID) : Observable<CommonResponse<GetAllUsersForCreditorResponseDTO>> => 
    this.http.get<CommonResponse<GetAllUsersForCreditorResponseDTO>>(
      `${this._apiUrl}/get-all-for-creditor?idDebtor=${idDebtor}`);

  Inactivate = (inactivateUser: InactivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.put<CommonResponse<string>>(`${this._apiUrl}/inactivate`, inactivateUser);
  
  Activate = (activateUser: ActivateUserRequestDTO) : Observable<CommonResponse<string>> => 
    this.http.put<CommonResponse<string>>(`${this._apiUrl}/activate`, activateUser);
}