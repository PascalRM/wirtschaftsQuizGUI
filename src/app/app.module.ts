import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KategorieComponent } from './kategorie/kategorie.component';
import { KategorieDetailComponent } from './kategorie-detail/kategorie-detail.component';
import { FragebogenComponent } from './fragebogen/fragebogen.component';
import { QuizComponent } from './quiz/quiz.component';
import { KontoComponent } from './konto/konto.component';
import { KontoFragebogenComponent } from './konto-fragebogen/konto-fragebogen.component';
import { KontoKategorieComponent } from './konto-kategorie/konto-kategorie.component';
import { HomeComponent } from './home/home.component';
import { RegistrierenComponent } from './registrieren/registrieren.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'kategorie', component: KategorieComponent },
  { path: 'details', component: KategorieDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent },
  { path: 'fragebogen', component: FragebogenComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'konto', component: KontoComponent },
  { path: 'konto/kategorie', component: KontoKategorieComponent },
  { path: 'konto/fragebogen', component: KontoFragebogenComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KategorieComponent,
    KategorieDetailComponent,
    FragebogenComponent,
    QuizComponent,
    KontoComponent,
    KontoFragebogenComponent,
    KontoKategorieComponent,
    HomeComponent,
    RegistrierenComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
