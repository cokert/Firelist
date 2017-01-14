import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AlertModule } from 'ng2-bootstrap/alert';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { routing } from './app.routing';
import { mainRouting } from './main/main.routing';
import { MainModule } from './main/main.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found.component';
import { UserIsLoggedInGuard } from './shared/userloggedinguard.service';
import { ScreenSizeService } from './shared/screen-size.service';
import { FirebaseSecrets } from './firebase-secrets';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(FirebaseSecrets.firebaseConfig),
    AuthModule,
    MainModule,
    mainRouting,
    routing
  ],
  providers: [ AuthService,
               UserIsLoggedInGuard,
               ScreenSizeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
