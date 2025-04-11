import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-inbound-list',
  templateUrl: './inbound-list.component.html',
  styleUrls: ['./inbound-list.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class InboundListComponent implements OnInit {
  // Filtros
  status: string = '';
  whsCode: string = '';
  supplyer: string = '';
  dateFrom: string = '';
  dateTo: string = '';

  // Tabla de resultados
  documents: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Carga inicial
    this.fetchInboundDocs();
  }

  fetchInboundDocs(): void {
    this.loading = true;
    this.errorMessage = '';

    const params: any = {};
    if (this.status) params.status = this.status;
    if (this.whsCode) params.whsCode = this.whsCode;
    // 'supplyer' no implementado en la API, lo omitimos a menos que tu backend lo maneje

    this.http
      .get<any>('http://10.1.108.10:8023/api/documents/inbound', { params })
      .subscribe({
        next: (response) => {
          // La API regresa { data: [...] }
          this.documents = response.data; // <--- extraemos el array
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener Documentos Inbound';
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
    this.supplyer = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.fetchInboundDocs();
  }

  goToDetail(docNum: string) {
    // Ajusta la ruta si tu detalle es /dashboard/document-detail/:billNo
    this.router.navigate(['/dashboard/document-detail', docNum]);
    
  }
}
