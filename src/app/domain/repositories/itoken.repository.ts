import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { UUID } from "crypto";

export interface ITokenRepository {
    ValidateTokenInquest(token: string) : Observable<CommonResponse<UUID>>;
}