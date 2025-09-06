import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthFacade } from '../../../application/facades/auth.facade';
import { LoginRequest } from '../../../domain/models/login/login.request';
import { AsyncPipe, DOCUMENT, isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { LoadingSpinnerFacade } from '../../../application/facades/loading.spinner.facade';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent implements OnInit {
  isLoading = true;
  email: string = '';
  password: string = '';

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: Object,
              private authFacade: AuthFacade,
              private notificationFacade: NotificationFacade,
              public loadingSpinnerFacade: LoadingSpinnerFacade) {
    this.loadingSpinnerFacade.Show();
  }

  ngOnInit() {
    this.loadingSpinnerFacade.Hide();
    if (isPlatformBrowser(this.platformId)) {
      const wrapper = this.document.querySelector(".wrapper") as HTMLElement;
      const logoCamaleon = this.document.querySelector(".app-brand-logo") as HTMLElement;
      const forgotPasswordHeader = this.document.querySelector(".forgot-password header") as HTMLElement;

      if (forgotPasswordHeader && logoCamaleon && wrapper) {
        forgotPasswordHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });

        logoCamaleon.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });
      }
    }
  }

  Login = () => {
    this.loadingSpinnerFacade.Show();
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password
    };
    this.authFacade.Login(loginRequest).subscribe({
      next: (response) => {
        if (response.succeeded) {
          window.location.href = 'home'
        } else {
          this.loadingSpinnerFacade.Hide();
          this.notificationFacade.Error(response.message);
        }          
      },
      error: () => {
        this.loadingSpinnerFacade.Hide();
        this.notificationFacade.Error('Ocurrió un error al intentar iniciar sesión.');
      }
    });
  }
}