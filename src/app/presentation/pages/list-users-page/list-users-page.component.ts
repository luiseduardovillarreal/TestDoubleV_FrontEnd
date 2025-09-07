import { Component } from '@angular/core';
import { formatDate, NgFor, NgIf } from '@angular/common';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { AlertFacade } from '../../../application/facades/alert.facade';
import { UserFacade } from '../../../application/facades/user.facade';
import { UUID } from 'crypto';
import { InactivateUserRequestDTO } from '../../../domain/models/user/inactivate.user.request.dto';
import { ActivateUserRequestDTO } from '../../../domain/models/user/activate.user.request.dto';
import { UserDTO } from '../../../domain/models/user/get.all.users.response.dto';

@Component({
  selector: 'app-list-users-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list-users-page.component.html',
  styleUrl: './list-users-page.component.css'
})
export class ListUsersPageComponent {
  users: UserDTO[] | undefined;
  inactivateUserRequest: InactivateUserRequestDTO = { id: '' as UUID };
  activateUserRequest: ActivateUserRequestDTO = { id: '' as UUID };
 
  constructor(private userFacade: UserFacade,
              private notificationFacade: NotificationFacade,
              private alertFacade: AlertFacade) {
    this.LoadUsers();
  }

  ActivateUser = async (idUser: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea reactivar el usuario?', 'Confirmar acción');
    if (confirmed) {
      this.activateUserRequest.id = idUser;
      this.userFacade.Activate(this.activateUserRequest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadUsers();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar reactivar el usuario.');
        }
      });
    }
  }

  FormatDate = (date: string | Date): string => {
    if (!date || new Date(date).getFullYear() <= 1)
      return 'No disponible';
    return formatDate(date, 'dd-MM-yyyy HH:mm:ss', 'en-US');
  }

  InactivateUser = async (idUser: UUID) : Promise<void> => {
    const confirmed = await this.alertFacade.Confirm('¿Está seguro que desea inactivar el usuario?', 'Confirmar acción');
    if (confirmed) {
      this.inactivateUserRequest.id = idUser;
      this.userFacade.Inactivate(this.inactivateUserRequest).subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.LoadUsers();
            this.notificationFacade.Success(response.message);
          }
          else
            this.notificationFacade.Error(response.message);
        },
        error: () => {
          this.notificationFacade.Error('Ocurrió un error al intentar inactivar el usuario.');
        }
      });
    }
  }

  LoadUsers = (): void => {
    this.userFacade.GetAll().subscribe({
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

  TruncateText = (text: string): string =>
    text.length > 50 ? text.substring(0, 50) + '...' : text;
}