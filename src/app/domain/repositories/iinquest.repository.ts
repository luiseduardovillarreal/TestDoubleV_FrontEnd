import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { CreateInquestRequest } from "../models/inquest/create/create.inquest.request";
import { GetInquestByIdResponse } from "../models/inquest/get-by-id/get.inquest.by.id.response";
import { UUID } from "crypto";
import { GetAllInquestsResponse } from "../models/inquest/get-all/get.all.inquests.response";
import { GetAllInquestsResultsResponse } from "../models/inquest/get-results/get.all.inquests.results.response";
import { InactivateInquestRequest } from "../models/inquest/inactivate/inactivate.inquest.request";
import { ReactivateInquestRequest } from "../models/inquest/reactivate/reactivate.inquest.request";

export interface IInquestRepository {
    Create(newInquest: CreateInquestRequest) : Observable<CommonResponse<string>>;
    GetAll() : Observable<CommonResponse<GetAllInquestsResponse>>;
    GetAllResults() : Observable<CommonResponse<GetAllInquestsResultsResponse>>;
    GetById(idInquest: UUID) : Observable<CommonResponse<GetInquestByIdResponse>>;
    Inactivate(inactivateInquest: InactivateInquestRequest) : Observable<CommonResponse<string>>;
    Reactivate(reactivateInquest: ReactivateInquestRequest) : Observable<CommonResponse<string>>;
    ValidateIsActive(idInquest: UUID) : Observable<CommonResponse<boolean>>;
    ValidateIsAnswered(idInquest: UUID) : Observable<CommonResponse<boolean>>;
}