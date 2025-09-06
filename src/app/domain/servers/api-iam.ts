import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ApiIAM {
    private domain: string = 'https://localhost:7109';
    
    public get Domain() : string {
        return this.domain;
    }
}