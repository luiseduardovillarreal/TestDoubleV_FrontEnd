import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../infrastructure/services/local.storage.service";
import { UserDTO } from "../../domain/models/login/user.dto";

@Injectable({ providedIn: 'root' })
export class StorageFacade {

    constructor(private localStorage: LocalStorageService) { }

    GetUserData = async (): Promise<UserDTO | null> => 
        await this.localStorage.GetUserData();

    ClearAuth = () : void => 
        this.localStorage.ClearAuth();

    GetToken = () : string | null => 
        this.localStorage.GetToken();

    UpdateAuth = (user: UserDTO) : void => 
        this.localStorage.UpdateAuth(user);
}