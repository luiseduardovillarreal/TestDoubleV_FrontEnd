import { Injectable } from "@angular/core";
import { CreateResultResponseRequest } from "../../domain/models/result.response/create.result.response.request";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { IResultResponseRepository } from "../../domain/repositories/iresult.response.repository";
import { ApiMovement } from "../../domain/servers/api-movement";

@Injectable({ providedIn: 'root' })
export class ResultResponseRepository implements IResultResponseRepository {
    private _apiUrl = this.apiMovement.Domain + '/result-response';

    constructor(private http: HttpClient,
                private apiMovement: ApiMovement) {}

    Create = (newResponses: CreateResultResponseRequest) : Observable<CommonResponse<string>> => 
        this.http.post<CommonResponse<string>>(`${this._apiUrl}/create`, newResponses);
}