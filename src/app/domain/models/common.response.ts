import { HttpStatusCode } from "@angular/common/http";

export class CommonResponse<T> {

    constructor(data: T, responseHttp: HttpStatusCode, 
        message: string, messageCustom: string, state: boolean) {
        this.succeeded = state;
        this.statusCode = responseHttp;
        this.message = message;
        this.messageCustom = messageCustom;
        this.data = data;
    }

    succeeded!: boolean;
    statusCode!: HttpStatusCode;
    message!: string;
    messageCustom!: string;
    data!: T;
}