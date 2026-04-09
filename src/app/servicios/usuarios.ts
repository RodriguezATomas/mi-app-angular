import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private URL_API = 'http://localhost:3000/api/usuarios';

  // Leer
  getUsuarios() {
    return this.http.get<any[]>(this.URL_API);
  }

  // En usuarios.service.ts
eliminarUsuario(id: string) { // <-- Aquí debe decir string
  return this.http.delete(`${this.URL_API}/${id}`);
}
  // Crear
  agregarUsuario(nuevoUsuario: any) {
    return this.http.post(this.URL_API, nuevoUsuario);
  }
}