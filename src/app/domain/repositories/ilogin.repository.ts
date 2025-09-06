import { Observable } from "rxjs";
import { LoginResponse } from "../models/login/login.response";
import { LoginRequest } from "../models/login/login.request";
import { CommonResponse } from "../models/common.response";

export interface ILoginRepository {
    Auth(request: LoginRequest) : Observable<CommonResponse<LoginResponse>>;
}