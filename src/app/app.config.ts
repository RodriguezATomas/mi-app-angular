// 1. Importamos las herramientas necesarias desde el núcleo de Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; 

// 2. Importamos las rutas que definimos en el archivo de rutas
import { routes } from './app.routes';

/**
 * appConfig es el objeto de configuración global.
 * Aquí "registramos" todas las herramientas (providers) que queremos 
 * que estén disponibles en toda nuestra aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimiza cómo Angular detecta cambios en la pantalla para que sea más rápida.
    // 'eventCoalescing' agrupa varios eventos para refrescar la interfaz una sola vez.
    provideZoneChangeDetection({ eventCoalescing: true }), 

    // Activa el sistema de navegación (rutas) usando la lista que definimos arriba.
    provideRouter(routes),

    // 'provideHttpClient' activa la capacidad de hacer peticiones a servidores (APIs).
    // 'withFetch()' le dice a Angular que use la tecnología más moderna del navegador para estas peticiones.
    provideHttpClient(withFetch()) 
  ]
};