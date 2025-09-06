import { LoginResponseDTO } from "../models/login/login.response.dto";
import { CommonResponse } from "../models/common.response";
import { UserDTO } from "../models/login/user.dto";

export interface ILocalStorageService {
    ClearAuth() : void;
    GetToken() : string | null;
    GetUserData(): Promise<UserDTO | null>;
    SaveAuth(auth: CommonResponse<LoginResponseDTO>) : void;
    UpdateAuth(user: UserDTO) : void;
}