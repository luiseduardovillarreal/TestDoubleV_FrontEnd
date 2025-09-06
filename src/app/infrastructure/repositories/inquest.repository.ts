import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { IInquestRepository } from "../../domain/repositories/iinquest.repository";
import { CreateInquestRequest } from "../../domain/models/inquest/create/create.inquest.request";
import { GetInquestByIdResponse } from "../../domain/models/inquest/get-by-id/get.inquest.by.id.response";
import { UUID } from "crypto";
import { GetAllInquestsResponse } from "../../domain/models/inquest/get-all/get.all.inquests.response";
import { GetAllInquestsResultsResponse } from "../../domain/models/inquest/get-results/get.all.inquests.results.response";
import { ApiSurvey } from "../../domain/servers/api-survey";
import { InactivateInquestRequest } from "../../domain/models/inquest/inactivate/inactivate.inquest.request";
import { ReactivateInquestRequest } from "../../domain/models/inquest/reactivate/reactivate.inquest.request";

@Injectable({ providedIn: 'root' })
export class InquestRepository implements IInquestRepository {
    private _apiUrl = this.apiSurvey.Domain + '/inquest';

    constructor(private http: HttpClient, 
                private apiSurvey: ApiSurvey) {}

    Create = (newInquest: CreateInquestRequest) : Observable<CommonResponse<string>> => 
        this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newInquest);

    GetAll = () : Observable<CommonResponse<GetAllInquestsResponse>> => 
        this.http.get<CommonResponse<GetAllInquestsResponse>>(`${this._apiUrl}/get-all`);

    GetAllResults = () : Observable<CommonResponse<GetAllInquestsResultsResponse>> => 
        this.http.get<CommonResponse<GetAllInquestsResultsResponse>>(`${this._apiUrl}/get-all-results`);

    GetById = (idInquest: UUID) : Observable<CommonResponse<GetInquestByIdResponse>> => 
        this.http.get<CommonResponse<GetInquestByIdResponse>>(`${this._apiUrl}/get-by-id?idInquest=${idInquest}`);

    Inactivate = (inactivateInquest: InactivateInquestRequest) : Observable<CommonResponse<string>> => 
        this.http.put<CommonResponse<string>>(`${this._apiUrl}/inactivate`, inactivateInquest);

    Reactivate = (reactivateInquest: ReactivateInquestRequest) : Observable<CommonResponse<string>> => 
        this.http.put<CommonResponse<string>>(`${this._apiUrl}/reactivate`, reactivateInquest);

    ValidateIsActive = (idInquest: UUID) : Observable<CommonResponse<boolean>> => 
        this.http.get<CommonResponse<boolean>>(`${this._apiUrl}/valid-is-active?idInquest=${idInquest}`);

    ValidateIsAnswered = (idInquest: UUID) : Observable<CommonResponse<boolean>> => 
        this.http.get<CommonResponse<boolean>>(`${this._apiUrl}/valid-is-answered?idInquest=${idInquest}`);
}