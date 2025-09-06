import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadingSpinnerFacade {
    private readonly loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();    

    Show = () : void => 
        this.loadingSubject.next(true);

    Hide = () : void => 
        this.loadingSubject.next(false);
}