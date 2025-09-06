import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, QueryList, ViewChildren } from '@angular/core';
import { TypeQuestionResponse } from '../../../domain/models/type.question/type.question.response';
import { TypeQuestionFacade } from '../../../application/facades/type-question.facade';
import { RouterModule } from '@angular/router';
import { ResponseComponent } from "../response/response.component";
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { LoadingSpinnerFacade } from '../../../application/facades/loading.spinner.facade';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, ResponseComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @ViewChildren(ResponseComponent) responseComponents!: QueryList<ResponseComponent>;
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();
  question = signal<string>('');
  typeQuestion = signal<string>('');
  IsInvalid = signal(false);
  typesQuestions!: TypeQuestionResponse[] | undefined;
  responses: number[] = [];

  constructor(private typeQuestionFacade: TypeQuestionFacade,
              private notificationFacade: NotificationFacade) { 
    this.AddResponse();
  }
  
  ngOnInit() {
    this.LoadTypesQuestions();
  }

  AddResponse = () : number => 
    this.responses.push(this.responses.length);

  ClearAll = () => {
    this.question.set('');
    this.typeQuestion.set('');
    this.responses = [0];
    this.responseComponents.first.ClearAll();
  }

  IsValid = (): boolean => {
    const validResponses = this.ValidateResponses()
    return !!this.question().trim() && !!this.typeQuestion().trim() && validResponses;
  }

  LoadTypesQuestions = () : void => {
    this.typeQuestionFacade.GetAllActives().subscribe({
      next: (response) => {
        if (response.succeeded) {
          this.typesQuestions = response.data.typesQuestions;
        } else {
          this.notificationFacade.Error(response.message);
        }
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar consultar los tipos de preguntas.');
      }
    });
  }

  MarkInvalid = () : void => 
    this.IsInvalid.set(!this.IsValid());

  RemoveResponse = (index: number) : void => {
    if (this.responses.length > 1)
      this.responses.pop();
    else
      this.notificationFacade.Error('La pregunta debe tener al menos una respuesta');
  }

  RemoveQuestion = () : void => 
    this.remove.emit(this.index);
  
  UpdateTextQuestion = (event: Event) : void => {
    const input = event.target as HTMLInputElement;
    this.question.set(input.value.trim());
  }

  UpdateSelectTypeResponse = (event: Event) : void => {
    const select = event.target as HTMLSelectElement;
    this.typeQuestion.set(select.value);
  }

  ValidateResponses = () : boolean => {
    let allValidates = true;
    this.responseComponents.forEach(r => {
      r.MarkInvalid();
      if (allValidates && !r.IsValid()) 
        allValidates = false;
    });
    return allValidates;
  }
}