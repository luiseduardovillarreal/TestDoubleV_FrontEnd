import { SubModuleResponse } from "./submodule.response";

export type ModuleState = '' | 'active';
export type ModuleCondition = '' | 'open-displayed';

export interface ModuleResponse {
    name: string;
    description: string;
    icon: string;
    subModules: SubModuleResponse[];
    state: ModuleState;
    condition: ModuleCondition;
}