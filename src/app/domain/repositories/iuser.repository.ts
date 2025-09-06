import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllUsersResponseDTO } from "../models/user/get.all.users.response.dto";
import { InactivateUserRequestDTO } from "../models/user/inactivate.user.request.dto";
import { ActivateUserRequestDTO } from "../models/user/activate.user.request.dto";
import { CreateUserRequestDTO } from "../models/user/create.user.request.dto";

export interface IUserRepository {
    Create(newUser: CreateUserRequestDTO) : Observable<CommonResponse<string>>;
    GetAll() : Observable<CommonResponse<GetAllUsersResponseDTO>>;
    Inactivate(inactivateUser: InactivateUserRequestDTO) : Observable<CommonResponse<string>>;
    Activate(activateUser: ActivateUserRequestDTO) : Observable<CommonResponse<string>>;
}