import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ApiMovement {
    private domain: string = 'https://localhost:7020';
    
    public get Domain() : string {
        return this.domain;
    }
}