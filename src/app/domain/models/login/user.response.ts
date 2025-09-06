import { UUID } from "crypto";
import { RolResponse } from "./rol.response";
import { ModuleResponse } from "./module.response";

export interface UserResponse {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
    rols: RolResponse[];
    modules: ModuleResponse[];
}