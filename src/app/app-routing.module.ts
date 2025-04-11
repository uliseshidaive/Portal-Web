import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

const routes: Routes = [
  // 1) Redirección por defecto a /auth/login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // 2) Rutas públicas (login, register) con GuestLayout
  {
    path: 'auth',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-login/auth-login.component').then(m => m.AuthLoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then(m => m.AuthRegisterComponent)
      }
    ]
  },

  // 3) Rutas internas de la app con AdminLayout
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [
      // Pantalla inicial "default" (Dashboard con KPI)
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component')
          .then(c => c.DefaultComponent)
      },
      // Ejemplos existentes
      {
        path: 'typography',
        loadComponent: () => import('./demo/component/basic-component/color/color.component')
          .then(c => c.ColorComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/component/basic-component/typography/typography.component')
          .then(c => c.TypographyComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/others/sample-page/sample-page.component')
          .then(c => c.SamplePageComponent)
      },

      // 4) NUEVAS RUTAS
      {
        path: 'inbound-list',
        loadComponent: () =>
          import('./demo/pages/inbound-list/inbound-list.component').then(m => m.InboundListComponent)
      },
      {
        path: 'outbound-list',
        loadComponent: () =>
          import('./demo/pages/outbound-list/outbound-list.component').then(m => m.OutboundListComponent)
      },
      {
        path: 'document-detail/:billNo', 
        loadComponent: () =>
          import('./demo/pages/document-detail/document-detail.component').then(m => m.DocumentDetailComponent)
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('./demo/pages/logs/logs.component').then(m => m.LogsComponent)
      },
      {
        path: 'audit',
        loadComponent: () =>
          import('./demo/pages/audit/audit.component').then(m => m.AuditComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
