import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenFacade } from '../../../application/facades/token.facade';
import { InquestResponse } from '../../../domain/models/inquest/common-get/inquest.response';
import { UUID } from 'crypto';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionResponse } from '../../../domain/models/inquest/common-get/question.response';
import { ResponseResponse } from '../../../domain/models/inquest/common-get/response.response';
import { CreateResultResponseRequest } from '../../../domain/models/result.response/create.result.response.request';
import { ResultResponseFacade } from '../../../application/facades/result.response.facade';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { LoadingSpinnerFacade } from '../../../application/facades/loading.spinner.facade';
import { DraggableIconComponent } from "../../components/draggable-icon/draggable-icon.component";
import { IpService } from '../../../infrastructure/services/ip.service';
import { GoogleMapsService } from '../../../infrastructure/services/google.maps.service';
import { InquestResultResponseMeta } from '../../../domain/models/inquest/common-get/inquest.result.response.meta';
import { InactivateInquestHubService } from '../../../infrastructure/services/inactivate.inquest.hub.service';

@Component({
  selector: 'app-response-inquest-page',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, AsyncPipe, DraggableIconComponent],
  templateUrl: './response-inquest-page.component.html',
  styleUrl: './response-inquest-page.component.css'
})
export class ResponseInquestPageComponent {
  idInquest!: UUID;
  inquest!: InquestResponse | null;
  responseInquest: CreateResultResponseRequest = {
    idInquest: '' as UUID,
    token: '',
    questions: [],
    latitude: 0,
    longitude: 0,
    ipResponse: ''
  };
  ipUser: string | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tokenFacade: TokenFacade,
              private inquestFacade: InquestFacade,
              private resultResponseFacade: ResultResponseFacade,
              private ipService: IpService,
              private googleMapsService: GoogleMapsService,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade,
              public loadingSpinnerFacade: LoadingSpinnerFacade,
              private inactivateInquestHubService: InactivateInquestHubService) {
    this.loadingSpinnerFacade.Show();
  }

  async ngOnInit() {
    this.ipUser = await this.ipService.GetClientIP().toPromise();
    this.route.queryParams.subscribe(params => {
      const rawToken = params['inquest'];
      const decodedToken = decodeURIComponent(rawToken);
      this.ValidateToken(decodedToken);
    });
    this.inactivateInquestHubService.GetInquestRefreshObservable().subscribe(async (idInquest) => {
      if (idInquest && this.idInquest)
        this.router.navigate(['/blocked']);
    });
  }

  private CanUserRespond = (meta: InquestResultResponseMeta[]): boolean => {
    if (!meta)
      return true;

    const validMeta = meta.some(met => met.ipResponse === this.ipUser);
    return !validMeta;
  }

  private ClearAll = () => {
    if (this.inquest) {
      this.inquest.questions = this.inquest.questions.map(q => ({
        ...q,
        responses: q.responses.map(res => ({ ...res, isSelected: false }))
      }));
    }
  }

  private LoadInquest = (idInquest: UUID): void => {
    this.inquestFacade.GetById(idInquest).subscribe({
      next: (response) => {
        if (!response.succeeded) {
          this.notificationFacade.Error(response.message);
          return;
        }
        this.inquest = response.data.inquest;
        if (!this.inquest.thisUniqueResponse) {
          this.loadingSpinnerFacade.Hide();
          return;
        }
        const meta = this.inquest.inquestResultsResponsesMetas;
        const canRespond = this.CanUserRespond(meta);
        if (canRespond) {
          this.loadingSpinnerFacade.Hide();
        } else if (meta && meta.some(met => met.ipResponse === this.ipUser)) {
          this.router.navigate(['/already-answered']);
        } else {
          this.notificationFacade.Error('Hubo inconvenientes al momento de obtener el ' +
            'identificador único a su respuesta. Consulte con el administrador del sistema');
        }
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar consultar los tipos de preguntas.');
      }
    });
  }

  OnResponseChange = (question: QuestionResponse, response: ResponseResponse, responses: ResponseResponse[]): void => {
    if (this.inquest && question.typeQuestion.type === 'Selección única') {
      this.inquest.questions = this.inquest.questions.map(q =>
        q === question
          ? {
            ...q,
            responses: q.responses.map(res =>
              res === response ? res : { ...res, isSelected: false }
            )
          }
          : q
      );
    }
  }

  SaveResponseOfInquest = async (): Promise<void> => {
    const validInquest = this.ValidateResponses();
    if (validInquest) {
      if (this.inquest) {
        const confirmed = await this.alertFacade.Confirm(
          '¿Está seguro de que desea registrar la información?', 'Confirmar acción');
        if (confirmed) {
          await this.SetDataRequest();
          this.resultResponseFacade.Create(this.responseInquest).subscribe({
            next: (response) => {
              if (response.succeeded) {
                this.ClearAll();
                if (this.inquest?.thisUniqueResponse)
                  this.router.navigate(['/thank-you']);
                else
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
      } else {
        this.notificationFacade.Error('No es válida la encuesta, contáctese con el administrador del aplciativo');
      }
    } else {
      this.notificationFacade.Error('Todas las preguntas deben tener su correspondiente o correspondientes respuestas');
    }
  }

  private SetDataRequest = async (): Promise<void> => {
    if (this.inquest) {
      const locationActual = await this.googleMapsService.GetCurrentLocation();
      this.responseInquest.idInquest = this.inquest.id;
      this.responseInquest.token = this.inquest.tokenInquest.token;
      this.responseInquest.questions = this.inquest.questions.map(q => ({
        id: q.id,
        typeQuestion: q.typeQuestion,
        responses: q.responses.filter(res => res.isSelected)
      }));
      this.responseInquest.latitude = locationActual.locationActual.latitude;
      this.responseInquest.longitude = locationActual.locationActual.longitude;
      this.responseInquest.ipResponse = this.ipUser;
    }
  }

  ValidateResponses = (): boolean => {
    if (!this.inquest || !this.inquest.questions) {
      return false;
    }
    return this.inquest.questions.map(q =>
      q.responses.some(res => res.isSelected)
    ).every(valid => valid);
  };

  private ValidateToken = (decodedToken: string): void => {
    if (decodedToken) {
      this.tokenFacade.ValidateTokenInquest(decodedToken).subscribe({
        next: (response) => {
          if (response.succeeded && response.statusCode === 200) {
            this.idInquest = response.data;
            this.ValidateStateInquest(response.data);
          } else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar validar el enlace de la encuesta.');
        }
      });
    } else {
      this.notificationFacade.Error('Enlace de encuesta no válido, verifique o cantáctese con el administrador del sistema');
    }
  }

  private ValidateStateInquest = (idInquest: UUID): void => {
    this.inquestFacade.ValidateIsActive(idInquest).subscribe({
      next: (response) => {
        if (response.data && response.succeeded) {
          this.LoadInquest(idInquest);
        } else if (!response.data && response.succeeded && response.statusCode === 200) {
          this.router.navigate(['/blocked']);
        } else {
          this.notificationFacade.Error(response.message);
        }
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar validar el estado de la encuesta.');
      }
    });
  }
}