import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from "rxjs";
import { NotificationFacade } from "../../application/facades/notification.facade";
import { UUID } from "crypto";
import { ApiMovement } from "../../domain/servers/api-movement";
import { IInactivateInquestHubService } from "../../domain/services/iinactivate.inquest.hub.service";

@Injectable({ providedIn: 'root' })
export class InactivateInquestHubService implements IInactivateInquestHubService {
    private hubConnection!: signalR.HubConnection;
    private inquestRefreshSubject = new BehaviorSubject<UUID | null>(null);

    constructor(private notificationFacade: NotificationFacade,
                private apiMovement: ApiMovement) {
        this.StartConnection();
    }

    private StartConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.apiMovement.Domain + '/inactivate-inquest-hub', {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .then()
            .catch(err => this.notificationFacade.Error(
                `La interactividad en tiempo real ha dejado de funcionar. ${err}`));

        this.ListenForRefresh();
    }

    private ListenForRefresh() {
        this.hubConnection.on('ReceiveInquestRefresh', (idInquest: UUID) => {
            this.inquestRefreshSubject.next(idInquest);
        });
    }

    GetInquestRefreshObservable() {
        return this.inquestRefreshSubject.asObservable();
    }
}