import { Injectable } from "@angular/core";
import { ITypeQuestionRepository } from "../../domain/repositories/itype.question.repository";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllTypesQuestionsResponse } from "../../domain/models/type.question/get.all.types.questions.response";
import { GetAllTypesQuestionsActivesResponse } from "../../domain/models/type.question/get.all.types.questions.actives.response";
import { ApiSurvey } from "../../domain/servers/api-survey";

@Injectable({ providedIn: 'root' })
export class TypeQuestionRepository implements ITypeQuestionRepository {
  private _apiUrl = this.apiSurvey.Domain + '/type-question';

  constructor(private http: HttpClient, 
              private apiSurvey: ApiSurvey) {}

  GetAllActives = () : Observable<CommonResponse<GetAllTypesQuestionsActivesResponse>> => 
    this.http.get<CommonResponse<GetAllTypesQuestionsActivesResponse>>(`${this._apiUrl}/get-all-actives`);

  GetAll = () : Observable<CommonResponse<GetAllTypesQuestionsResponse>> => 
    this.http.get<CommonResponse<GetAllTypesQuestionsResponse>>(`${this._apiUrl}/get-all`);
}