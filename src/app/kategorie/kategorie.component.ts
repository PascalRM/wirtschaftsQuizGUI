import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Kategorie } from '../kategorie.model';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {
  user: User = User.getUser();
  kategorien: Kategorie[] = [];

  constructor(private http: HttpClient) {
    this.user = User.getUser();
  }

  ngOnInit() {
    this.getKategorie();
  }

  getKategorie() {
    var headers = new HttpHeaders();
    //headers.append('Accept','application/json');
    //headers.append('Content-Type','application/json');

    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie')
      .subscribe((data: any) => {
        data.forEach(element => {
          let kat = new Kategorie();
          kat.id = element.id;
          kat.name = element.kategorie;
          kat.ersteller = element.id_user
          this.kategorien.push(kat);
        });
        console.log(data);
        console.log(this.kategorien);
      }, err => {
        console.log("login failed");
      }
      );
  }
}
