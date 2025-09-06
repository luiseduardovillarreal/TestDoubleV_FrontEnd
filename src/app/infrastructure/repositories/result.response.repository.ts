import { Injectable } from "@angular/core";
import { CreateResultResponseRequest } from "../../domain/models/result.response/create.result.response.request";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { IResultResponseRepository } from "../../domain/repositories/iresult.response.repository";
import { ApiSurvey } from "../../domain/servers/api-survey";

@Injectable({ providedIn: 'root' })
export class ResultResponseRepository implements IResultResponseRepository {
    private _apiUrl = this.apiSurvey.Domain + '/result-response';

    constructor(private http: HttpClient,
                private apiSurvey: ApiSurvey) {}

    Create = (newResponses: CreateResultResponseRequest) : Observable<CommonResponse<string>> => 
        this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newResponses);
}