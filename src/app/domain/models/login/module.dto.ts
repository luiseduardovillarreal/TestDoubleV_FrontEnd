import { SubModuleDTO } from "./submodule.dto";

export type ModuleState = '' | 'active';
export type ModuleCondition = '' | 'open-displayed';

export interface ModuleDTO {
    name: string;
    description: string;
    icon: string;
    subModules: SubModuleDTO[];
    state: ModuleState;
    condition: ModuleCondition;
}