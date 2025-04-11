import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AuditComponent implements OnInit {
  // Filtros para la búsqueda
  zoneNo: string = '';
  matCode: string = '';
  matStatus: string = '';

  // Arreglos que recibiremos del API
  summary: any[] = [];
  detail: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Puedes llamar a fetchAudit() automáticamente si lo deseas
    // this.fetchAudit();
  }

  fetchAudit(): void {
    this.loading = true;
    this.errorMessage = '';
    const params: any = {};
    if (this.zoneNo) { params.zoneNo = this.zoneNo; }
    if (this.matCode) { params.matCode = this.matCode; }
    if (this.matStatus) { params.matStatus = this.matStatus; }

    this.http.get<any>('http://10.1.108.10:8023/api/audit/inventory', { params })
      .subscribe({
        next: (resp) => {
          // Se espera recibir un objeto { summary: [...], detail: [...] }
          this.summary = resp.summary || [];
          this.detail = resp.detail || [];
          // Inicializamos la propiedad expanded en cada fila de resumen para el dropdown
          this.summary.forEach(row => row.expanded = false);
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener datos de auditoría';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  toggleBreakdown(row: any): void {
    row.expanded = !row.expanded;
  }
}
