import { Component } from '@angular/core';
import { CommonModule, formatDate, NgFor } from '@angular/common';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { UUID } from 'crypto';
import { DebtFacade } from '../../../application/facades/debt.facade';
import { DebtDTO } from '../../../domain/models/debt/get.all.debts.response.dto';
import { ActivateDebtRequestDTO } from '../../../domain/models/debt/activate.debt.request.dto';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayDTO } from '../../../domain/models/pay/get.all.pays.debts.response.dto';

@Component({
  selector: 'app-list-pays-page',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, FormsModule],
  templateUrl: './list-pays-page.component.html',
  styleUrl: './list-pays-page.component.css'
})
export class ListPaysPageComponent {
  debts: DebtDTO[] | undefined;
  debtSelected: DebtDTO | undefined;
  pays: PayDTO[] | undefined;
  activateDebtRequest: ActivateDebtRequestDTO = { id: '' as UUID };
 
  constructor(private debtFacade: DebtFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.LoadDebts();
  }

  FormatDate = (date: string | Date): string => {
    if (!date || new Date(date).getFullYear() <= 1)
      return 'No disponible';
    return formatDate(date, 'dd-MM-yyyy HH:mm:ss', 'en-US');
  }

  LoadDebts = (): void => {
    this.debtFacade.GetAll().subscribe({
      next: (response) => {
        if (response.succeeded){
          this.debts = response.data.debts;
        }          
        else
          this.notificationFacade.Error(response.message);
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar consultar los pagos.');
      }
    });
  }

  SelectedCreditor = () : void => {
    if (this.debtSelected)
      this.pays = this.debtSelected.debtsMovements;
    else
      this.pays = undefined;
  }
}