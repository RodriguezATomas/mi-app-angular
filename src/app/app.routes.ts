// 1. Importamos el tipo 'Routes' para que TypeScript nos ayude a no cometer errores.
import { Routes } from '@angular/router';

/**
 * 'routes' es un array (una lista) de objetos.
 * Cada objeto conecta una "ruta" (lo que pones en la URL) con un "componente".
 */
export const routes: Routes = [
  /* Ejemplo de cómo se llenaría en el futuro:
    { path: 'usuarios', component: ListaUsuariosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: '', redirectTo: '/usuarios', pathMatch: 'full' } // Ruta por defecto
  */
];