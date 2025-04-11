import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-outbound-list',
  templateUrl: './outbound-list.component.html',
  styleUrls: ['./outbound-list.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class OutboundListComponent implements OnInit {
  // Filtros
  status: string = '';
  whsCode: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  // Tabla de resultados
  documents: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchOutboundDocs();
  }

  fetchOutboundDocs(): void {
    this.loading = true;
    this.errorMessage = '';

    const params: any = {};
    if (this.status) params.status = this.status;
    if (this.whsCode) params.whsCode = this.whsCode;
    // Ajusta si manejas otros filtros (dateFrom, dateTo) en tu API

    this.http
      .get<any>('http://10.1.108.10:8023/api/documents/outbound', { params })
      .subscribe({
        next: (response) => {
          // Asumiendo la API retorna { data: [...] }
          this.documents = response.data;
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener Documentos Outbound';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  resetFilters(): void {
    this.status = '';
    this.whsCode = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.fetchOutboundDocs();
  }

  goToDetail(docNum: string) {
    // Ajusta si tu detalle es /dashboard/document-detail/:billNo
    this.router.navigate(['/dashboard/document-detail', docNum]);
  }
}
