import { Injectable } from "@angular/core";
import { Notyf } from "notyf";

@Injectable({ providedIn: 'root' })
export class NotificationFacade {
    private notyf: Notyf | undefined;

    constructor() {
        if (typeof window !== 'undefined') {
            this.notyf = new Notyf({
                duration: 4000,
                position: { x: 'center', y: 'top' },
                dismissible: true,
            });
        }
    }

    Error = (message: string) => {
        if (this.notyf)
            this.notyf.error(message);
    }
    
    Success = (message: string) => {
        if (this.notyf)
            this.notyf.success(message);
    }
}