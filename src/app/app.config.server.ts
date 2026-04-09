// 1. Importamos herramientas para fusionar configuraciones y manejar el núcleo de Angular
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// 2. Importamos las herramientas específicas para SSR (Server Side Rendering)
import { provideServerRendering, withRoutes } from '@angular/ssr';
// 3. Traemos la configuración básica que ya hicimos (la del Wi-Fi, rutas, etc.)
import { appConfig } from './app.config';
// 4. Traemos las rutas específicas que el servidor debe conocer
import { serverRoutes } from './app.routes.server';

/**
 * serverConfig: Es la configuración extra que solo se usa cuando la app 
 * se ejecuta en un servidor Node.js (en lugar del navegador).
 */
const serverConfig: ApplicationConfig = {
  providers: [
    // Activa el renderizado en el servidor y le pasa las rutas que debe procesar.
    // Esto sirve para que la página cargue más rápido y sea mejor para el SEO (Google).
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

/**
 * Aquí ocurre la magia: mergeApplicationConfig une la configuración 
 * del navegador (appConfig) con la del servidor (serverConfig).
 * Así, la app tiene lo mejor de los dos mundos.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);