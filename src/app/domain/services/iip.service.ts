import { Observable } from "rxjs";

export interface IIpService {
    GetClientIP() : Observable<string>;
}