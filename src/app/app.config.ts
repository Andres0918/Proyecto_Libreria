import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"project-biblioteca","appId":"1:11351138828:web:b8640cbf6713395dd64429","storageBucket":"project-biblioteca.appspot.com","apiKey":"AIzaSyBipadDzAwwPzUUDvC08sc7IhGkK-2VkG4","authDomain":"project-biblioteca.firebaseapp.com","messagingSenderId":"11351138828"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
