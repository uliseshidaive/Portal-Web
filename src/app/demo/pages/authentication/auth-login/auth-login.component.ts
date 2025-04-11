import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    // Se crea un objeto con las credenciales para enviarlo en el cuerpo de la petición
    const credentials = { username: this.username, password: this.password };

    this.http.post('http://10.1.108.10:8023/api/login', credentials)
      .subscribe({
        next: (response: any) => {
          // Si la respuesta es exitosa, redirigimos al dashboard
          this.router.navigate(['/dashboard/default']);
        },
        error: () => {
          this.errorMessage = 'Usuario o contraseña inválida';
        }
      });
  }
}
