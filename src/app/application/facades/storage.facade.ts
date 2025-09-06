import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../infrastructure/services/local.storage.service";
import { UserResponse } from "../../domain/models/login/user.response";

@Injectable({ providedIn: 'root' })
export class StorageFacade {

    constructor(private localStorage: LocalStorageService) { }

    GetUserData = async (): Promise<UserResponse | null> => 
        await this.localStorage.GetUserData();

    ClearAuth = () : void => 
        this.localStorage.ClearAuth();

    GetToken = () : string | null => 
        this.localStorage.GetToken();

    UpdateAuth = (user: UserResponse) : void => 
        this.localStorage.UpdateAuth(user);
}