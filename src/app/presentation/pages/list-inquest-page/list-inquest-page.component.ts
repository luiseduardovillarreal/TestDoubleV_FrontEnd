import { Component } from '@angular/core';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { InquestResponse } from '../../../domain/models/inquest/common-get/inquest.response';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { UUID } from 'node:crypto';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { InactivateInquestRequest } from '../../../domain/models/inquest/inactivate/inactivate.inquest.request';
import { ReactivateInquestRequest } from '../../../domain/models/inquest/reactivate/reactivate.inquest.request';

@Component({
  selector: 'app-list-inquest-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-inquest-page.component.html',
  styleUrl: './list-inquest-page.component.css'
})
export class ListInquestPageComponent {
  inquests: InquestResponse[] | undefined;
  description: string = '';
  inactivateInquest: InactivateInquestRequest = {
    idInquest: '' as UUID
  };
  reactivateInquest: ReactivateInquestRequest = {
    idInquest: '' as UUID
  };

  constructor(private inquestFacade: InquestFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.LoadInquests();
  }

  FormatDate = (date: string | Date): string => {
    if (!date || new Date(date).getFullYear() <= 1)
      return 'No disponible';
    return formatDate(date, 'dd-MM-yyyy HH:mm:ss', 'en-US');
  }

  InactivateInquest = async (idInquest: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea inactivar la encuesta?', 'Confirmar acción');
    if (confirmed) {
      this.inactivateInquest.idInquest = idInquest;
      this.inquestFacade.Inactivate(this.inactivateInquest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadInquests();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar inactivar la encuesta.');
        }
      });
    }
  }

  LoadInquests = (): void => {
    this.inquestFacade.GetAll().subscribe({
      next: (response) => {
        if (response.succeeded)
          this.inquests = response.data.inquests;
        else
          this.notificationFacade.Error(response.message);
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar consultar las encuestas.');
      }
    });
  }

  ReactivateInquest = async (idInquest: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea reactivar la encuesta?', 'Confirmar acción');
    if (confirmed) {
      this.reactivateInquest.idInquest = idInquest;
      this.inquestFacade.Reactivate(this.reactivateInquest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadInquests();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar reactivar la encuesta.');
        }
      });
    }
  }

  TruncateText = (text: string): string =>
    text.length > 50 ? text.substring(0, 50) + '...' : text;

  ViewDescription = (description: string) =>
    this.description = description;
}