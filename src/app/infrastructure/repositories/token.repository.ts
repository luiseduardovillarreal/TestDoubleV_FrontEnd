import { Injectable } from "@angular/core";
import { ITokenRepository } from "../../domain/repositories/itoken.repository";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { UUID } from "crypto";
import { ApiIAM } from "../../domain/servers/api-iam";

@Injectable({ providedIn: 'root' })
export class TokenRepository implements ITokenRepository {
    private _apiUrl = this.apiIAM.Domain + '/token';

    constructor(private http: HttpClient,
                private apiIAM: ApiIAM) {}

    ValidateTokenInquest = (token: string) : Observable<CommonResponse<UUID>> => {
        const tokenEncoded = token.replace(/\+/g, "%2B");
        return this.http.get<CommonResponse<UUID>>(
            `${this._apiUrl}/validate-token-inquest?token=${tokenEncoded}`);
    }
}