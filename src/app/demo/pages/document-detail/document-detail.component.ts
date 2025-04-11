import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  imports: [CommonModule]
})
export class DocumentDetailComponent implements OnInit {
  loading = false;
  errorMessage = '';

  // Datos de cabecera (lo que retorne la API en "header")
  header: any = {};
  // Todas las líneas con detalle completo
  lines: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Se obtiene el "billNo" de la URL
    const billNo = this.route.snapshot.paramMap.get('billNo');
    if (billNo) {
      this.fetchDetail(billNo);
    } else {
      this.errorMessage = 'No se proporcionó un número de documento';
    }
  }

  fetchDetail(billNo: string) {
    this.loading = true;
    this.errorMessage = '';

    // Llamada GET al endpoint que retorna { header: {...}, lines: [...] }
    this.http.get<any>(`http://10.1.108.10:8023/api/documents/inbound/${billNo}`)
      .subscribe({
        next: (response) => {
          this.header = response.header;
          this.lines = response.lines;
        },
        error: (err) => {
          this.errorMessage = 'Error al obtener detalle de documento Inbound';
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
