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
    if (passwordF.value != passwordRepeatF.value) {
      this.result = "Passwörter stimmen nicht überein";
    }
    var data = {
      name: nameF.value,
      email: emailF.value,
      password: passwordF.value,
      password_confirmation: passwordRepeatF.value
    }
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/registrieren', data)
      .subscribe((data: any) => {
        console.log(data);
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {
        console.log("registriert");
      }
      );
  }
}
