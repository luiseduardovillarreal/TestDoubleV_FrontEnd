import { CommonModule, NgFor } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from '../../components/question/question.component';
import { FormsModule } from '@angular/forms';
import { Inquest } from '../../../domain/models/inquest/create/inquest';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';

@Component({
  selector: 'app-create-inquest-page',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, QuestionComponent, FormsModule],
  templateUrl: './create-inquest-page.component.html',
  styleUrl: './create-inquest-page.component.css'
})
export class CreateInquestPageComponent {
  @ViewChildren(QuestionComponent) questionComponents!: QueryList<QuestionComponent>;
  titleInquest!: string;
  descriptionInquest!: string;
  inquestExpireForUser: boolean = false;
  inquestOpen: boolean = false;
  questions: number[] = [];
  titleInquestLbl: boolean = false;
  descriptionInquestLbl: boolean = false;
  atLeastOneChecked: boolean = false;
  newInquest: Inquest = {
    title: '',
    description: '',
    thisUniqueResponse: false,
    thisOpen: false,
    questions: []
  };

  constructor(private inquestFacade: InquestFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.AddQuestion();
  }

  AddQuestion = () => 
    this.questions.push(this.questions.length);

  private ClearAll = () => {
    this.titleInquest = '';
    this.descriptionInquest = '';
    this.inquestExpireForUser = false;
    this.inquestOpen = false;
    this.questions = [0];
    this.titleInquestLbl = false;
    this.descriptionInquestLbl = false;
    this.atLeastOneChecked = false;
    this.questionComponents.first.ClearAll();
  }

  ClearValidations = () => {
    this.titleInquestLbl = false;
    this.descriptionInquestLbl = false;
    this.atLeastOneChecked = false;
    this.questionComponents.forEach(q => {
      q.IsInvalid.set(false);
      q.responseComponents.forEach(r => {
        r.IsInvalid.set(false);
      });
    });
  }

  InquestExpireForUserSelected = () =>
    this.inquestOpen = false;

  InquestOpenSelected = () => 
    this.inquestExpireForUser = false;

  OnKeyUp = (event: KeyboardEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const inputName = inputElement.name;
    const inputValue = inputElement.value.trim();
    if (inputValue.length > 0) {
      inputName === 'titleInquest'
        ? this.titleInquestLbl = false
        : inputName === 'descriptionInquest'
          ? this.descriptionInquestLbl = false
          : undefined;
    }
  }

  RemoveQuestion = (index: number) => {
    if (this.questions.length > 1)
      this.questions = this.questions.filter((_, i) => i !== index);
    else
      this.notificationFacade.Error('La encuesta debe contar por lo menos con una pregunta');
  }

  SaveInquest = async () => {
    this.titleInquestLbl = !this.titleInquest?.trim();
    this.descriptionInquestLbl = !this.descriptionInquest?.trim();
    this.atLeastOneChecked = !(this.inquestExpireForUser || this.inquestOpen);
    const validOtherComponents = this.ValidateQuestions();
    this.titleInquest = this.titleInquest?.trimEnd().trimStart();
    this.descriptionInquest = this.descriptionInquest?.trimEnd().trimStart();    
    const valids = !this.titleInquestLbl && !this.descriptionInquestLbl && validOtherComponents && !this.atLeastOneChecked;
    if (valids) {
      this.newInquest.title = this.titleInquest;
      this.newInquest.description = this.descriptionInquest;
      this.newInquest.thisUniqueResponse = this.inquestExpireForUser;
      this.newInquest.thisOpen = this.inquestOpen;
      this.newInquest.questions = this.questionComponents.map(q => ({
        question: q.question(),
        idTypeQuestion: q.typeQuestion(),
        responses: q.responseComponents.map(r => ({ response: r.response() }))
      }));
      const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea registrar la información?', 'Confirmar acción');
      if (confirmed) {
        this.inquestFacade.Create({ inquest: this.newInquest }).subscribe({
          next: (response) => {
            if (response.succeeded) {
              this.ClearAll();
              this.notificationFacade.Success(response.message);
            } else {
              this.notificationFacade.Error(response.message);
            }
          },
          error: () => {
            this.notificationFacade.Error('Ocurrió un error al intentar registrar la encuesta.');
          }
        });
      }
    } 
    else
      this.notificationFacade.Error('Verifique, falta info obligatoria');
  }

  ValidateQuestions = (): boolean => {
    let allValidates = true;
    this.questionComponents.forEach(q => {
      q.MarkInvalid();
      if (allValidates && !q.IsValid())
        allValidates = false;
    });
    return allValidates;
  }
}