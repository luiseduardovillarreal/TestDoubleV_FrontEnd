import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from "rxjs";
import { IChartHubService } from "../../domain/services/ichart.hub.service";
import { NotificationFacade } from "../../application/facades/notification.facade";
import { UUID } from "crypto";
import { ApiSurvey } from "../../domain/servers/api-survey";

@Injectable({ providedIn: 'root' })
export class ChartHubService implements IChartHubService {
    private hubConnection!: signalR.HubConnection;
    private chartRefreshSubject = new BehaviorSubject<UUID | null>(null);

    constructor(private notificationFacade: NotificationFacade,
                private apiSurvey: ApiSurvey) {
        this.StartConnection();
    }

    private StartConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.apiSurvey.Domain + '/chart-hub', {
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
        this.hubConnection.on('ReceiveChartsRefresh', (idInquest: UUID) => {
            this.chartRefreshSubject.next(idInquest);
        });
    }

    GetChartRefreshObservable() {
        return this.chartRefreshSubject.asObservable();
    }
}