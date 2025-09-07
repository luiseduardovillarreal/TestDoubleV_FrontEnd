import { Component } from '@angular/core';
import { CommonModule, formatDate, NgFor, NgIf } from '@angular/common';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { UUID } from 'crypto';
import { DebtFacade } from '../../../application/facades/debt.facade';
import { DebtDTO } from '../../../domain/models/debt/get.all.debts.response.dto';
import { ActivateDebtRequestDTO } from '../../../domain/models/debt/activate.debt.request.dto';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-debts-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, CommonModule, FormsModule],
  templateUrl: './list-debts-page.component.html',
  styleUrl: './list-debts-page.component.css'
})
export class ListDebtsPageComponent {
  debts: DebtDTO[] | undefined;
  activateDebtRequest: ActivateDebtRequestDTO = { id: '' as UUID };
 
  constructor(private debtFacade: DebtFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.LoadDebts();
  }

  ActivateDebt = async (idDebt: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea reactivar la deuda?', 'Confirmar acción');
    if (confirmed) {
      this.activateDebtRequest.id = idDebt;
      this.debtFacade.Activate(this.activateDebtRequest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadDebts();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar reactivar la deuda.');
        }
      });
    }
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
        this.notificationFacade.Error('Ocurrió un error al intentar consultar las deudas.');
      }
    });
  }
}