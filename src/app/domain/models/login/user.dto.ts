import { UUID } from "crypto";
import { ModuleDTO } from "./module.dto";

export interface UserDTO {
    id: UUID;
    names: string;
    lastNames: string;
    email: string;
    modules: ModuleDTO[];
}