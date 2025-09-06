import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class AlertFacade {

    Confirm(message: string, title: string): Promise<boolean> {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => result.isConfirmed);
    }

    Error(message: string, title: string) {
        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    Success(message: string, title: string) {
        Swal.fire({
            title: title,
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    Warning(message: string, title: string) {
        Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }    
}