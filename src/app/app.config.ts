import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- IMPORTANTE

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // Aquí activamos el cliente HTTP para que tus servicios funcionen
    // Usamos withFetch() para que sea más moderno y rápido (como pedía el aviso de la terminal)
    provideHttpClient(withFetch()) 
  ]
};