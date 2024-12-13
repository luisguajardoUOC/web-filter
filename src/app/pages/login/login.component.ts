import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl : './login.component.css',
})
export class LoginComponent {

  user: string | undefined;
  password: string | undefined;

  constructor(private router: Router) {}

  login() {
    console.log(this.user);
    console.log(this.password);
    // Simulación de validación de credenciales
    if (this.user === 'admin' && this.password === 'admin123') {
      // Redirigir al dashboard
      this.router.navigate(['/dashboard'], { queryParams: {} });
    } else {
      console.log('Credenciales inválidas');
    }
  }
}
