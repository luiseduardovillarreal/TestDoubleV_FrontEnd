import { Observable } from "rxjs";
import { CommonResponse } from "../models/common.response";
import { GetAllTypesQuestionsActivesResponse } from "../models/type.question/get.all.types.questions.actives.response";
import { GetAllTypesQuestionsResponse } from "../models/type.question/get.all.types.questions.response";

export interface ITypeQuestionRepository {
    GetAllActives() : Observable<CommonResponse<GetAllTypesQuestionsActivesResponse>>;
    GetAll() : Observable<CommonResponse<GetAllTypesQuestionsResponse>>;
}