import { Component } from '@angular/core';
import { StorageFacade } from '../../../application/facades/storage.facade';
import { UserResponse } from '../../../domain/models/login/user.response';
import { RolResponse } from '../../../domain/models/login/rol.response';
import { ModuleResponse } from '../../../domain/models/login/module.response';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoadingSpinnerFacade } from '../../../application/facades/loading.spinner.facade';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf, AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  user!: UserResponse | null;
  rols!: RolResponse[] | undefined;
  modules!: ModuleResponse[] | undefined;

  constructor(private storageFacade: StorageFacade,
              public loadingSpinnerFacade: LoadingSpinnerFacade,
              private router: Router,) {}

  async ngOnInit() {
    this.user = await this.storageFacade.GetUserData();
    this.rols = this.user?.rols;
    this.modules = this.user?.modules;
    this.OpenMenuAndSubMenuSelected();
    this.loadingSpinnerFacade.Hide();
  }

  Logout = () : void => {
    this.storageFacade.ClearAuth();
    window.location.href = 'login'
  }

  ClickInMenu = (nameMenu: string) : void => {
    if (this.modules) {
      const menu = this.modules.find(mod => mod.name === nameMenu);
      if (menu) {
        this.modules.forEach(menu => {
          if (menu.name === nameMenu) {
            if (menu.name === 'Dashboard') {
              if (menu.state === 'active') {
                menu.state = '';
              } else {
                menu.state = 'active';
              }
            } else {
              if (menu.state === 'active' && menu.condition === 'open-displayed') {
                menu.state = '';
                menu.condition = '';
              } else {
                menu.state = 'active';
                menu.condition = 'open-displayed';
              }
            }
          } else {
            menu.state = '';
            menu.condition = '';
          }        
        });
        this.UpdateMenusAndSubMenuInLocalStorage();
      }
    }
  }

  ClickInSubMenu = (nameSubMenu: string) : void => {
    if (this.modules) {
      this.modules.forEach(menu => {
        menu.subModules?.forEach(subModule => {
          subModule.state = subModule.name === nameSubMenu ? 'active' : '';
        });
      });
      this.UpdateMenusAndSubMenuInLocalStorage();
    }
  }

  OpenMenuAndSubMenuSelected = () : void => {
    let activeModule: ModuleResponse | undefined;
    let activeSubModule: ModuleResponse['subModules'][0] | undefined;
    activeModule = this.modules?.find(module =>
      module.state === 'active' &&
      module.subModules?.some(sub => sub.state === 'active')
    );
    if (activeModule) {
      activeSubModule = activeModule.subModules?.find(sub => sub.state === 'active');
      this.router.navigate([`/home/${activeSubModule?.routerLink}`]);
    } else {
      if (this.modules) {
        this.modules.forEach(menu => {
          if (menu.name === 'Dashboard')
            menu.state = 'active';
        });
        this.router.navigate([`/home`]);
      }
    }
  }

  private UpdateMenusAndSubMenuInLocalStorage = () : void => {
    if (this.user && this.modules) {
      const updatedModules = this.modules.map(module => ({
        ...module,
        subModules: module.subModules?.map(sub => ({ ...sub })) ?? []
      }));  
      this.user.modules = updatedModules;
      this.storageFacade.UpdateAuth(this.user);
    }
  }
}