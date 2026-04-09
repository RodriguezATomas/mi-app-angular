import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  // Asegúrate de que este nombre sea EXACTO
  enviarExcel(archivo: File) {
    const formData = new FormData();
    formData.append('file', archivo);
    return this.http.post('http://localhost:3000/upload', formData);
  }
}