import { Routes } from '@angular/router';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { WhitOutAuthGuard } from './application/guards/without.auth.guard';
import { WithAuthGuard } from './application/guards/with.auth.guard';
import { NotFoundPageComponent } from './presentation/pages/not-found-page/not-found-page.component';
import { ListDebtsPageComponent } from './presentation/pages/list-debts-page/list-debts-page.component';
import { ListPaysPageComponent } from './presentation/pages/list-pays-page/list-pays-page.component';
import { ListUsersPageComponent } from './presentation/pages/list-users-page/list-users-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent, canActivate: [WhitOutAuthGuard] },
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [WithAuthGuard],
        children: [
            { path: 'list-users', component: ListUsersPageComponent },
            { path: 'list-debts', component: ListDebtsPageComponent },
            { path: 'list-pays', component: ListPaysPageComponent }
        ]
    },
    { path: 'not-found', component: NotFoundPageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }//,
    // { path: '**', redirectTo: '/not-found' }
];