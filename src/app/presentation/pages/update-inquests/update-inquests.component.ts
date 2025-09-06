import { Component } from '@angular/core';
import { InquestResponse } from '../../../domain/models/inquest/common-get/inquest.response';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-update-inquests',
  standalone: true,
  imports: [NgFor],
  templateUrl: './update-inquests.component.html',
  styleUrl: './update-inquests.component.css'
})
export class UpdateInquestsComponent {
  inquests: InquestResponse[] | undefined;

  constructor(private inquestFacade: InquestFacade,
              private notificationFacade: NotificationFacade) {
    this.LoadInquests();
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

  SaveInquest = () => void {}
}