import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Componentes propios del layout
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    NavigationComponent,
    NavBarComponent,
    ConfigurationComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent implements OnInit {
  // Banderas para la navegación lateral
  navCollapsed: boolean;
  navCollapsedMob: boolean;

  // KPIs: Entradas y salidas para Producto Terminado (PT) y Materia Prima (MT)
  inboundKpiPT = { pending: 0, processing: 0, processed: 0, abnormal: 0 };
  inboundKpiMT = { pending: 0, processing: 0, processed: 0, abnormal: 0 };
  outboundKpiPT = { pending: 0, processing: 0, processed: 0, abnormal: 0 };
  outboundKpiMT = { pending: 0, processing: 0, processed: 0, abnormal: 0 };

  // Indicadores de carga y error
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getKpi();
  }

  // Llamada a la API de KPIs
  getKpi(): void {
    this.loading = true;
    this.http.get<any>('http://10.1.108.10:8023/api/kpi')
      .subscribe({
        next: (res) => {
          this.inboundKpiPT = res?.inboundPT || this.inboundKpiPT;
          this.inboundKpiMT = res?.inboundMT || this.inboundKpiMT;
          this.outboundKpiPT = res?.outboundPT || this.outboundKpiPT;
          this.outboundKpiMT = res?.outboundMT || this.outboundKpiMT;
        },
        error: () => {
          this.errorMessage = 'Error al obtener los KPIs';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  // Manejo del menú lateral (para dispositivos móviles y escritorio)
  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document
      .querySelector('app-navigation.pc-sidebar')
      ?.classList.contains('navbar-collapsed')
    ) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
  }
}
