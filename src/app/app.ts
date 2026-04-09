import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelService } from './excel'; // Para archivos locales (opcional mantenerlo)
import { GoogleDriveService } from './google-drive'; // <--- IMPORTANTE: Importa el nuevo servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // 1. Variables para la tabla y columnas
  columnasTotales: string[] = [];
  todasLasFilas: any[] = [];
  columnasSeleccionadas: string[] = [];

  // 2. Inyectamos AMBOS servicios (el local y el de Google Drive)
  constructor(
    private excelService: ExcelService, 
    private driveService: GoogleDriveService // <--- Añadido aquí
  ) {}

  /**
   * NUEVA FUNCIÓN: Para conectar con Google Drive
   */
  conectarDrive() {
    console.log("¡Hice clic en el botón!"); // <-- Si esto no sale, el problema es el HTML
    // 1. Pedir permiso al usuario
    this.driveService.obtenerAcceso((token) => {
      
      // 2. Abrir el selector de archivos de Google
      this.driveService.abrirSelector(token, (fileId) => {
        
        // 3. Enviar el ID del archivo elegido a nuestro Backend (Node.js)
        this.driveService.enviarAlBackend(fileId, token).subscribe({
          next: (res: any) => {
            // Guardamos los datos recibidos para mostrarlos en la tabla
            this.columnasTotales = res.columnas || [];
            this.todasLasFilas = res.filas || [];
            this.columnasSeleccionadas = []; // Limpiamos selecciones previas
            console.log('Datos cargados desde Google Drive con éxito');
          },
          error: (err: any) => {
            console.error('Error procesando el archivo de Drive:', err);
            alert('El servidor no pudo procesar el archivo de Google Drive.');
          }
        });

      });
    });
  }

  /**
   * FUNCIÓN ORIGINAL: Por si aún quieres subir archivos desde la PC
   */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelService.enviarExcel(file).subscribe({
        next: (res: any) => {
          console.log('Respuesta cruda del servidor:', res); // <--- MIRA ESTO EN CONSOLA
          this.columnasTotales = res.columnas || [];
          this.todasLasFilas = res.filas || [];
          this.columnasSeleccionadas = []; // Reiniciamos para que el usuario elija de nuevo
          console.log('Nombres nuevos de columnas:', this.columnasTotales);
        },
        error: (err: any) => {
          console.error('Error al conectar con la API:', err);
          alert('No se pudo conectar con el servidor.');
        }
      });
    }
  }

  /**
   * Función para los checkboxes de la tabla
   */
  toggleColumn(col: string) {
    if (this.columnasSeleccionadas.includes(col)) {
      this.columnasSeleccionadas = this.columnasSeleccionadas.filter(c => c !== col);
    } else {
      this.columnasSeleccionadas.push(col);
    }
  }
}