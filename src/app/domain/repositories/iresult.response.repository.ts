import { Observable } from "rxjs";
import { CreateResultResponseRequest } from "../models/result.response/create.result.response.request";
import { CommonResponse } from "../models/common.response";

export interface IResultResponseRepository {
    Create(newResponses: CreateResultResponseRequest) : Observable<CommonResponse<string>>;
}