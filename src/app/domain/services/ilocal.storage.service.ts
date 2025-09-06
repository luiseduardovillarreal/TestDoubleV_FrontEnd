import { LoginResponse } from "../models/login/login.response";
import { CommonResponse } from "../models/common.response";
import { UserResponse } from "../models/login/user.response";

export interface ILocalStorageService {
    ClearAuth() : void;
    GetToken() : string | null;
    GetUserData(): Promise<UserResponse | null>;
    SaveAuth(auth: CommonResponse<LoginResponse>) : void;
    UpdateAuth(user: UserResponse) : void;
}