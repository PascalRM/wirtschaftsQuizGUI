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

const appRoutes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'kategorie', component: KategorieComponent },
  { path: 'details', component: KategorieDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fragebogen', component: FragebogenComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KategorieComponent,
    KategorieDetailComponent,
    FragebogenComponent,
    QuizComponent
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
