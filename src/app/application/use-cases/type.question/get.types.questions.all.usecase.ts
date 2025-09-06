import { Injectable } from "@angular/core";
import { TypeQuestionRepository } from "../../../infrastructure/repositories/type.question.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllTypesQuestionsResponse } from "../../../domain/models/type.question/get.all.types.questions.response";

@Injectable({ providedIn: 'root' })
export class GetTypeQuestionAllUseCase {

  constructor(private repository: TypeQuestionRepository) {}
  
  Execute = () : Observable<CommonResponse<GetAllTypesQuestionsResponse>> => 
    this.repository.GetAll();
}