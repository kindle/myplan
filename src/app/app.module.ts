import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
//import { provideAuth, getAuth } from '@angular/fire/auth';
//import { provideFirestore, getFirestore } from '@angular/fire/firestore';
//mport { provideStorage, getStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
		//provideAuth(() => getAuth()),
		//provideFirestore(() => getFirestore()),
		//provideStorage(() => getStorage())
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SocialSharing,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
