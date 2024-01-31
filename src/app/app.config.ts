import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';



 export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,  withComponentInputBinding()) ,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cryptoworld-85fa4","appId":"1:911100579924:web:828a3056f397383aca5dc1","storageBucket":"cryptoworld-85fa4.appspot.com","apiKey":"AIzaSyD7FdIcNKg-z67lPFubZkp75Xdeyr1quEE","authDomain":"cryptoworld-85fa4.firebaseapp.com","messagingSenderId":"911100579924","measurementId":"G-6L22QNPCEY"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())) ,
  ]


};