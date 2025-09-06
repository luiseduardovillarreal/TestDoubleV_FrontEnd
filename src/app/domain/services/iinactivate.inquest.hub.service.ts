import { UUID } from "crypto";
import { Observable } from "rxjs";

export interface IInactivateInquestHubService {
    GetInquestRefreshObservable() : Observable<UUID | null>;
}