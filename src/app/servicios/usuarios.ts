import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor(private http: HttpClient) {}

  enviarExcel(archivo: File) {
    const formData = new FormData();
    formData.append('file', archivo); // 'file' debe coincidir con el backend
    return this.http.post('http://localhost:3000/upload', formData);
  }
}