import { CommonModule, formatDate, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { CreateDebtRequestDTO, DebtDTO as create_DebtDTO } from '../../../domain/models/debt/create.debt.request.dto';
import { UUID } from 'crypto';
import { DebtFacade } from '../../../application/facades/debt.facade';
import { StorageFacade } from '../../../application/facades/storage.facade';
import { UserFacade } from '../../../application/facades/user.facade';
import { UserDTO } from '../../../domain/models/user/get.all.users.for.creditor.response.dto';
import { DebtDTO as getAllByUser_DebtDTO } from '../../../domain/models/debt/get.all.debts.by.user.response.dto';
import { CreatePayDebtRequestDTO, PayDebtDTO } from '../../../domain/models/pay/create.pay.debt.request.dto';
import { PayFacade } from '../../../application/facades/pay.facade';

@Component({
  selector: 'app-manage-debts-page',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, FormsModule],
  templateUrl: './manage-debts-page.component.html',
  styleUrl: './manage-debts-page.component.css'
})
export class ManageDebtsPageComponent {
  amount!: number;
  amountLbl: boolean = false;
  creditorSelectedLbl: boolean = false;
  users: UserDTO[] | undefined;
  debts: getAllByUser_DebtDTO[] | undefined;
  userSelected: UserDTO | undefined;
  createDebtRequest: CreateDebtRequestDTO = {
    debt: {
      idUserDebtor: '' as UUID,
      idUserCreditor: '' as UUID,
      amount: 0,
      difference: 0
    } as create_DebtDTO
  };
  createPayDebtRequest: CreatePayDebtRequestDTO = { pay: {} as PayDebtDTO };

  constructor(private storageFacade: StorageFacade,
              private userFacade: UserFacade,
              private debtFacade: DebtFacade,
              private payFacade: PayFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.LoadUsersForCreditor();
    this.LoadDebtsForUser();
  }

  private ClearAll = () => {
    this.amount = 0;
    this.amountLbl = false;
    this.creditorSelectedLbl = false;
  }

  ClearValidations = () => {
    this.amountLbl = false;
    this.creditorSelectedLbl = false;
  }

  FormatDate = (date: string | Date): string => {
    if (!date || new Date(date).getFullYear() <= 1)
      return 'No disponible';
    return formatDate(date, 'dd-MM-yyyy HH:mm:ss', 'en-US');
  }

  DeleteDebt = async (idDebt: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea eliminar la deuda?', 'Confirmar acción');
    if (confirmed) {
      this.debtFacade.Delete(idDebt).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadDebtsForUser();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar eliminar la deuda.');
        }
      });
    }
  }

  private LoadDebtsForUser = async () : Promise<void> => {
    const user = await this.storageFacade.GetUserData();
    this.debtFacade.GetAllByUser(user?.id as UUID).subscribe({
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

  private LoadUsersForCreditor = async () : Promise<void> => {
    const user = await this.storageFacade.GetUserData();
    this.userFacade.GetAllForCreditor(user?.id as UUID).subscribe({
      next: (response) => {
        if (response.succeeded)
          this.users = response.data.users;
        else
          this.notificationFacade.Error(response.message);
      },
      error: () => {
        this.notificationFacade.Error('Ocurrió un error al intentar consultar los usuarios.');
      }
    });
  }

  OnKeyUp = (event: KeyboardEvent) => {
    const inputElement = event.target as HTMLInputElement;
    const inputName = inputElement.name;
    const inputValue = inputElement.value.trim();
    if (inputValue.length > 0) {
      inputName === 'amount'
        ? this.amountLbl = false
        : undefined;
    }
  }

  Pay = async (idDebt: UUID) => {
    const payAmount = await this.alertFacade.Pay();
    if (payAmount || payAmount > 0) {
      this.createPayDebtRequest.pay.idDebt = idDebt;
      this.createPayDebtRequest.pay.amount = payAmount;
      this.payFacade.Create(this.createPayDebtRequest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.ClearAll();
            this.notificationFacade.Success(response.message);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            this.notificationFacade.Error(response.message);
          }
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar registrar la deuda.');
        }
      });           
    } else {
      this.notificationFacade.Error('El monto a pagar debe ser mayor a 0');
      return;
    }   
  }

  SaveDebt = async () => {
    if (!this.amount || this.amount <= 0)
      this.amountLbl = true;

    if (!this.userSelected)
      this.creditorSelectedLbl = true;

    const valids = !(this.amountLbl || this.creditorSelectedLbl);

    if (valids) {
      const user = await this.storageFacade.GetUserData();
      this.createDebtRequest.debt.idUserDebtor = user?.id as UUID;
      this.createDebtRequest.debt.idUserCreditor = this.userSelected?.id as UUID;
      this.createDebtRequest.debt.amount = this.amount;
      this.createDebtRequest.debt.difference = this.amount;
      const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea registrar la información?', 'Confirmar acción');
      if (confirmed) {
        this.debtFacade.Create(this.createDebtRequest).subscribe({
          next: (response) => {
            if (response.succeeded) {
              this.ClearAll();
              this.notificationFacade.Success(response.message);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              this.notificationFacade.Error(response.message);
            }
          },
          error: () => {
            this.notificationFacade.Error('Ocurrió un error al intentar registrar la deuda.');
          }
        });
      }
    } 
    else
      this.notificationFacade.Error('Verifique, falta info obligatoria');
  }

  SelectedCreditor = () : void => {
    if (this.userSelected)
      this.creditorSelectedLbl = false;
    else
      this.creditorSelectedLbl = true;
  }
}