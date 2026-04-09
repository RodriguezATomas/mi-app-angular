import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Declaramos las variables globales de Google para que TypeScript no de error
declare var gapi: any;
declare var google: any;

@Injectable({ providedIn: 'root' })
export class GoogleDriveService {
  // ⚠️ REEMPLAZA ESTOS VALORES con los de tu Google Cloud Console
  private apiKey = 'AIzaSyBZ7E81ht6kbe-ZqzJgSkPR20Kj285sGSA';
  private clientId = '539660398061-np91srp3qlm34qqmkhr9ck3uf9qug0q7.apps.googleusercontent.com';
  
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  /**
   * PASO 1: Inicia el flujo de autenticación de Google
   */
  obtenerAcceso(callback: (token: string) => void) {
  try {
    console.log("Iniciando cliente de Google...");
    const cliente = google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (respuesta: any) => {
        console.log("Respuesta de Google recibida:", respuesta);
        if (respuesta.access_token) {
          callback(respuesta.access_token);
        } else {
          console.error("No se recibió token. Respuesta completa:", respuesta);
        }
      },
    });
    cliente.requestAccessToken();
  } catch (error) {
    console.error("ERROR CRÍTICO al inicializar Google:", error);
  }
}

  /**
   * PASO 2: Muestra la ventana para elegir el Excel
   */
 abrirSelector(token: string, callback: (fileId: string) => void) {
  console.log("Intentando abrir el Selector con el token..."); // <-- AÑADE ESTO
  
  // Cargar la librería del Picker
  gapi.load('picker', () => {
    console.log("Librería Picker cargada correctamente"); // <-- AÑADE ESTO
    
    const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
      .setMimeTypes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); // Solo Excel

    const picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .setDeveloperKey(this.apiKey) // <--- REVISA QUE ESTA SEA TU API KEY
      .setAppId(this.clientId)     // <--- REVISA QUE SEA TU CLIENT ID
      .setOAuthToken(token)
      .addView(view)
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const doc = data.docs[0];
          console.log("Archivo seleccionado:", doc.id);
          callback(doc.id);
        }
      })
      .build();
    
    picker.setVisible(true);
  });
}
  /**
   * PASO 3: Envía el ID y el Token a tu servidor Node.js
   */
  enviarAlBackend(fileId: string, token: string) {
    // Esta es la ruta que configuramos en el server.js
    return this.http.post('http://localhost:3000/process-drive', { 
      fileId: fileId, 
      token: token 
    });
  }
}