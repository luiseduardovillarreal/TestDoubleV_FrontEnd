export type SubModuleState = '' | 'active';

export interface SubModuleResponse {
    name: string;
    description: string;
    routerLink: string;
    state: SubModuleState;
}