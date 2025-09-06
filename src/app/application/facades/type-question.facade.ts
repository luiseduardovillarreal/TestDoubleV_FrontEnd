import { Injectable } from "@angular/core";
import { GetTypesQuestionsAllActivesUseCase } from "../use-cases/type.question/get.types.questions.all.actives.usecase";
import { GetTypeQuestionAllUseCase } from "../use-cases/type.question/get.types.questions.all.usecase";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { GetAllTypesQuestionsActivesResponse } from "../../domain/models/type.question/get.all.types.questions.actives.response";
import { GetAllTypesQuestionsResponse } from "../../domain/models/type.question/get.all.types.questions.response";

@Injectable({ providedIn: 'root' })
export class TypeQuestionFacade {
    
  constructor(private getAllActives: GetTypesQuestionsAllActivesUseCase,
              private getAll: GetTypeQuestionAllUseCase) {}

  GetAllActives = () : Observable<CommonResponse<GetAllTypesQuestionsActivesResponse>> => 
    this.getAllActives.Execute();

  GetAll = () : Observable<CommonResponse<GetAllTypesQuestionsResponse>> => 
    this.getAll.Execute();
}