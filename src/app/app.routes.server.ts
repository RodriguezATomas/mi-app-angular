// 1. Importamos las herramientas de SSR (Server Side Rendering) de Angular.
// 'RenderMode' define CÓMO se dibuja la página y 'ServerRoute' define PARA QUÉ ruta.
import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * serverRoutes: Es una lista de rutas que solo entiende el servidor.
 * Aquí configuramos si las páginas se cargan en el momento o si ya vienen listas.
 */
export const serverRoutes: ServerRoute[] = [
  {
    // El símbolo '**' significa "todas las rutas" (comodín).
    path: '**', 
    
    // 'Prerender' significa que Angular generará el HTML de toda la app 
    // en el momento en que haces el "build" (cuando compilas para subir a internet).
    // Esto hace que la página cargue instantáneamente porque ya está "dibujada".
    renderMode: RenderMode.Prerender
  }
];