import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllUsersResponseDTO } from "../models/user/get.all.users.response.dto";
import { InactivateUserRequestDTO } from "../models/user/inactivate.user.request.dto";
import { ActivateUserRequestDTO } from "../models/user/activate.user.request.dto";
import { CreateUserRequestDTO } from "../models/user/create.user.request.dto";
import { GetAllUsersForCreditorResponseDTO } from "../models/user/get.all.users.for.creditor.response.dto";
import { UUID } from "crypto";

export interface IUserRepository {
    Activate(activateUser: ActivateUserRequestDTO) : Observable<CommonResponse<string>>;
    Create(newUser: CreateUserRequestDTO) : Observable<CommonResponse<string>>;
    GetAll() : Observable<CommonResponse<GetAllUsersResponseDTO>>;
    GetAllForCreditor(idDebtor: UUID) : Observable<CommonResponse<GetAllUsersForCreditorResponseDTO>>;
    Inactivate(inactivateUser: InactivateUserRequestDTO) : Observable<CommonResponse<string>>;    
}