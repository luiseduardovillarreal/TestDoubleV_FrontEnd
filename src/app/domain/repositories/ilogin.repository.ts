import { Observable } from "rxjs";
import { LoginResponseDTO } from "../models/login/login.response.dto";
import { LoginRequestDTO } from "../models/login/login.request.dto";
import { CommonResponse } from "../models/common.response";

export interface ILoginRepository {
    Auth(request: LoginRequestDTO) : Observable<CommonResponse<LoginResponseDTO>>;
}