import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"proyecto-biblioteca-268b2","appId":"1:329329077100:web:5e6ad041ca866d3b2da149","storageBucket":"proyecto-biblioteca-268b2.appspot.com","apiKey":"AIzaSyBD9BMXK95p7y2p0lXH1GhW8wtoGW0melU","authDomain":"proyecto-biblioteca-268b2.firebaseapp.com","messagingSenderId":"329329077100","measurementId":"G-M720CR0E2J"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"proyecto-biblioteca-268b2","appId":"1:329329077100:web:5e6ad041ca866d3b2da149","storageBucket":"proyecto-biblioteca-268b2.appspot.com","apiKey":"AIzaSyBD9BMXK95p7y2p0lXH1GhW8wtoGW0melU","authDomain":"proyecto-biblioteca-268b2.firebaseapp.com","messagingSenderId":"329329077100","measurementId":"G-M720CR0E2J"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
