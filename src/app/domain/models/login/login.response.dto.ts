import { UserDTO } from "./user.dto";

export interface LoginResponseDTO {
    user: UserDTO;
    token: string;
}