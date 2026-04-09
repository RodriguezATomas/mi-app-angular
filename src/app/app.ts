import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './servicios/usuarios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], // Agrega aquí otros componentes si los usas
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private usuariosService: UsuariosService) {} // Inyección simple
  // 1. Inyectamos el servicio que acabas de volver a crear
  // private usuariosService = inject(UsuariosService);

  // 2. Variable para almacenar los usuarios de la base de datos
  listaUsuarios: any[] = [];

  // 3. Al iniciar, traemos los datos
  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.listaUsuarios = res;
        console.log('Usuarios cargados desde MongoDB:', res);
      },
      error: (err) => console.error('Error al conectar con Node:', err)
    });
  }

  // 4. Función para crear un usuario
  crear(nombre: string, rol: string) {
    if (!nombre || !rol) return; // Validación simple

    const nuevo = { nombre, rol };
    this.usuariosService.agregarUsuario(nuevo).subscribe(() => {
      this.obtenerUsuarios(); // Refrescamos la lista
    });
  }

  // Cambia (id: number) por (id: string)
  borrar(id: string) { 
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(() => {
        this.obtenerUsuarios(); // Refresca la lista
      });
    }
  }
}