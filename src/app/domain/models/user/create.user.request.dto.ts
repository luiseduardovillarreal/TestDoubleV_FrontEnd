export interface CreateUserRequestDTO {
    user: UserDTO;
}

export interface UserDTO {
    names: string;
    lastNames: string;
    email: string;
    password: string;
}