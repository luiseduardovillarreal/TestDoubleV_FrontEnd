import { Routes } from '@angular/router';
import { LoginPageComponent } from './presentation/pages/login-page/login-page.component';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { WhitOutAuthGuard } from './application/guards/without.auth.guard';
import { WithAuthGuard } from './application/guards/with.auth.guard';
import { CreateInquestPageComponent } from './presentation/pages/create-inquest-page/create-inquest-page.component';
import { ListInquestPageComponent } from './presentation/pages/list-inquest-page/list-inquest-page.component';
import { NotFoundPageComponent } from './presentation/pages/not-found-page/not-found-page.component';
import { ResponseInquestPageComponent } from './presentation/pages/response-inquest-page/response-inquest-page.component';
import { GraphicsInquestPageComponent } from './presentation/pages/graphics-inquest-page/graphics-inquest-page.component';
import { UnderConstructionPageComponent } from './presentation/pages/under-construction-page/under-construction-page.component';
import { ThankYouPageComponent } from './presentation/pages/thank-you-page/thank-you-page.component';
import { AlreadyAnsweredComponent } from './presentation/pages/already-answered/already-answered.component';
import { BlockedPageComponent } from './presentation/pages/blocked-page/blocked-page.component';
import { MapResultResponsesComponent } from './presentation/pages/map-result-responses/map-result-responses.component';
import { UpdateInquestsComponent } from './presentation/pages/update-inquests/update-inquests.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent, canActivate: [WhitOutAuthGuard] },
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [WithAuthGuard],
        children: [
            { path: 'create-inquests', component: CreateInquestPageComponent },
            { path: 'update-inquests', component: UpdateInquestsComponent },
            { path: 'list-inquests', component: ListInquestPageComponent },
            { path: 'graphics-inquests', component: GraphicsInquestPageComponent },
            { path: 'map-result-responses', component: MapResultResponsesComponent }
        ]
    },
    { path: 'response-inquest', component: ResponseInquestPageComponent },
    { path: 'thank-you', component: ThankYouPageComponent },
    { path: 'already-answered', component: AlreadyAnsweredComponent },
    { path: 'blocked', component: BlockedPageComponent },
    { path: 'under-construction', component: UnderConstructionPageComponent, canActivate: [WithAuthGuard] },
    { path: 'not-found', component: NotFoundPageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }//,
    // { path: '**', redirectTo: '/not-found' }
];