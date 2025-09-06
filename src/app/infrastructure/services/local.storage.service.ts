import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CommonResponse } from "../../domain/models/common.response";
import { LoginResponseDTO } from "../../domain/models/login/login.response.dto";
import { ILocalStorageService } from "../../domain/services/ilocal.storage.service";
import { UserDTO } from "../../domain/models/login/user.dto";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements ILocalStorageService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_DATA_KEY = 'user_data';

    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    ClearAuth = () : void => {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_DATA_KEY);
    }

    GetToken = () : string | null => 
        localStorage.getItem(this.TOKEN_KEY);

    GetUserData = async () : Promise<UserDTO | null> => {
        if (isPlatformBrowser(this.platformId)) {
            const userData = localStorage.getItem(this.USER_DATA_KEY);
            return userData ? JSON.parse(userData) as UserDTO : null;
        }
        return null;
    }

    SaveAuth = (auth: CommonResponse<LoginResponseDTO>) : void => {
        localStorage.setItem(this.TOKEN_KEY, auth.data.token);
        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(auth.data.user));
    }

    UpdateAuth = (user: UserDTO) : void => {
        localStorage.removeItem(this.USER_DATA_KEY);
        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    }
}