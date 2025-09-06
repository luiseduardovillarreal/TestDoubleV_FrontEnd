export type SubModuleState = '' | 'active';

export interface SubModuleDTO {
    name: string;
    description: string;
    routerLink: string;
    state: SubModuleState;
}