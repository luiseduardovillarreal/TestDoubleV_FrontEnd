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

    async Pay() {
        const { value: payAmount } = await Swal.fire({
            title: 'Registrar pago',
            input: 'number',
            inputLabel: 'Ingrese el monto a pagar',
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || isNaN(Number(value)) || Number(value) <= 0) {
                    return 'Por favor ingrese un valor válido mayor a 0';
                }
                return null;
            }
        });
        if (payAmount) {
            const numericValue = Number(payAmount);
            return numericValue;
        } else {
            return 0;
        }
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