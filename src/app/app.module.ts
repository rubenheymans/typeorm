import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { DemoMaterialModule } from './demo-material-module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import {
  // AngularFirestoreModule,
  SETTINGS,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import {
  ORIGIN,
  REGION,
  AngularFireFunctionsModule
} from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
  ],
  providers: [
    // Firebase emulator local database
    {
      provide: SETTINGS,
      useValue: !environment.production
        ? {
          host: 'localhost:8080',
          ssl: false
        }
        : undefined,
    },
    // Firebase emulator local functions
    // {
    //   provide: ORIGIN,
    //   useValue: !environment.production
    //     ? 'http://localhost:5001'
    //     : 'https://pigeon-ac8aa.web.app',
    // },
    // Callable functions
    { provide: REGION, useValue: 'us-central1' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
