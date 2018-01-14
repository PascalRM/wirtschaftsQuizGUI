import {
  Component, OnInit,
  Input
} from '@angular/core';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { async } from '@angular/core/testing';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrls: ['./registrieren.component.css']
})
export class RegistrierenComponent implements OnInit {
  result: String;

  constructor(private http: HttpClient, private location: Location, private router: Router) { }

  ngOnInit() {
  }

  registrieren(nameF: HTMLInputElement, emailF: HTMLInputElement, passwordF: HTMLInputElement, passwordRepeatF: HTMLInputElement) {
    var data = {
      name: nameF.value,
      email: emailF.value,
      password: passwordF.value,
      password_confirmation: passwordRepeatF.value
    }
    if (nameF.value == "" || emailF.value == "" || passwordF.value == "" || passwordRepeatF.value == "") {
      this.result = "Bitte alle Felder ausfüllen";
    } else {
      if (passwordF.value != passwordRepeatF.value) {
        this.result = "Passwörter stimmen nicht überein";
      } else {
        let exists = false;
        let antwort;
        this.http
          .get('https://arcane-escarpment-45624.herokuapp.com/api/userinfo/' + emailF.value)
          .subscribe((data: any) => {
            antwort = data;
            if (data.length > 0) {
              exists = true;
            } else {
              exists = false;
            }
          }, err => {
            console.log("Failed" + " " + err.value);
          }, () => {
            if (antwort.length > 0) {
              this.result = "Email exestiert bereits"
            } else {
              this.insert(data);
            }
          }
          );
      }
    }


  }

  insert(data) {
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/registrieren', data)
      .subscribe((data: any) => {
      }, () => {
        //Überprüfen ob der Benutzer eingetragen wurde
        let exists = false;
        let antwort;
        this.http
          .get('https://arcane-escarpment-45624.herokuapp.com/api/userinfo/' + data.email)
          .subscribe((data: any) => {
            antwort = data;
            if (data.length > 0) {
              exists = true;
            } else {
              exists = false;
            }
            if (antwort.length > 0) {
              this.result = "Erfolgreich registriert";
            } else {
            }
          }
          );
      }
      );
  }

  routeLogin() {
    this.router.navigateByUrl("/login");
  }

  routeHome(){
    this.router.navigateByUrl("/home");
  }

}
