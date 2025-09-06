import { Injectable } from "@angular/core";
import { TypeQuestionRepository } from "../../../infrastructure/repositories/type.question.repository";
import { Observable } from "rxjs";
import { CommonResponse } from "../../../domain/models/common.response";
import { GetAllTypesQuestionsActivesResponse } from "../../../domain/models/type.question/get.all.types.questions.actives.response";

@Injectable({ providedIn: 'root' })
export class GetTypesQuestionsAllActivesUseCase {

  constructor(private repository: TypeQuestionRepository) {}

  Execute = () : Observable<CommonResponse<GetAllTypesQuestionsActivesResponse>> => 
    this.repository.GetAllActives();
}