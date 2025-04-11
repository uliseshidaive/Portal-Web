import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// Íconos de ant-design
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { LogoutOutline } from '@ant-design/icons-angular/icons';

// Módulos de Angular y ng-bootstrap
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  imports: [
    // Para usar <i antIcon> con type="logout"
    IconDirective,

    // Para usar [routerLink] y router navegaciones
    RouterModule,

    // Para usar [ngbDropdown], ngbDropdownMenu, etc.
    NgbDropdownModule
  ]
})
export class NavRightComponent {
  private iconService = inject(IconService);

  constructor(private router: Router) {
    // Registramos el ícono de "logout"
    this.iconService.addIcon(LogoutOutline);
  }

  onLogout(): void {
    // Aquí tu lógica de logout: remover token, redirigir a login, etc.
    localStorage.removeItem('basicAuthToken');
    this.router.navigate(['/auth/login']);
  }
}
