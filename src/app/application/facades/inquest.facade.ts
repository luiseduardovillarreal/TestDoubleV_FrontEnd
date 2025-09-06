import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../../domain/models/common.response";
import { CreateInquestUseCase } from "../use-cases/inquest/create.inquest.usecase";
import { CreateInquestRequest } from "../../domain/models/inquest/create/create.inquest.request";
import { GetAllInquestsUseCase } from "../use-cases/inquest/get.all.inquests.usecase";
import { GetInquestByIdResponse } from "../../domain/models/inquest/get-by-id/get.inquest.by.id.response";
import { GetInquestByIdUseCase } from "../use-cases/inquest/get.inquest.by.id.usecase";
import { UUID } from "crypto";
import { GetAllInquestsResponse } from "../../domain/models/inquest/get-all/get.all.inquests.response";
import { GetAllInquestsResultsResponse } from "../../domain/models/inquest/get-results/get.all.inquests.results.response";
import { GetAllInquestsResultsUseCase } from "../use-cases/inquest/get.all.inquests.results.usecase";
import { InactivateInquestUseCase } from "../use-cases/inquest/inactivate.inquest.usecase";
import { ReactivateInquestUseCase } from "../use-cases/inquest/reactivate.inquest.usecase";
import { InactivateInquestRequest } from "../../domain/models/inquest/inactivate/inactivate.inquest.request";
import { ReactivateInquestRequest } from "../../domain/models/inquest/reactivate/reactivate.inquest.request";
import { ValidateIsActiveInquestUseCase } from "../use-cases/inquest/validate.is.active.inquest.usecase";
import { ValidateIsAnsweredInquestUseCase } from "../use-cases/inquest/validate.is.answered.inquest.usecase";

@Injectable({ providedIn: 'root' })
export class InquestFacade {
    
  constructor(private create: CreateInquestUseCase,
              private getAll: GetAllInquestsUseCase,
              private getAllResults: GetAllInquestsResultsUseCase,
              private getById: GetInquestByIdUseCase,
              private inactivate: InactivateInquestUseCase,
              private reactivate: ReactivateInquestUseCase,
              private validateIsActive: ValidateIsActiveInquestUseCase,
              private validateIsAnswered: ValidateIsAnsweredInquestUseCase) {}

  Create = (newInquest: CreateInquestRequest) : Observable<CommonResponse<string>> => 
    this.create.Execute(newInquest);

  GetAll = () : Observable<CommonResponse<GetAllInquestsResponse>> => 
    this.getAll.Execute();

  GetAllResults = () : Observable<CommonResponse<GetAllInquestsResultsResponse>> => 
    this.getAllResults.Execute();

  GetById = (idInquest: UUID) : Observable<CommonResponse<GetInquestByIdResponse>> => 
    this.getById.Execute(idInquest);

  Inactivate = (inactivateInquest: InactivateInquestRequest) : Observable<CommonResponse<string>> => 
    this.inactivate.Execute(inactivateInquest);

  Reactivate = (reactivateInquest: ReactivateInquestRequest) : Observable<CommonResponse<string>> => 
    this.reactivate.Execute(reactivateInquest);

  ValidateIsActive = (idInquest: UUID) : Observable<CommonResponse<boolean>> => 
    this.validateIsActive.Execute(idInquest);

  ValidateIsAnswered = (idInquest: UUID) : Observable<CommonResponse<boolean>> => 
    this.validateIsAnswered.Execute(idInquest);
}