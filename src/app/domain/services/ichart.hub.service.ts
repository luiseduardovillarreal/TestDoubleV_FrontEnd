import { UUID } from "crypto";
import { Observable } from "rxjs";

export interface IChartHubService {
    GetChartRefreshObservable() : Observable<UUID | null>;
}