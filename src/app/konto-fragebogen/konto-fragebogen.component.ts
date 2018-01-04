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

import { KategorieDetail } from '../kategorie_detail.model';
import { Fragebogen } from '../fragebogen.model';
import { FrageInterface } from '../frage.interface';
import { FragebogenDetail } from '../fragebogen_detail.model';
import { User } from '../user.model';
import { Kategorie } from '../kategorie.model';
import { Frage } from '../frage.model';
import { Fragen } from '../fragen_detail.model';

@Component({
  selector: 'app-konto-fragebogen',
  templateUrl: './konto-fragebogen.component.html',
  styleUrls: ['./konto-fragebogen.component.css']
})
export class KontoFragebogenComponent implements OnInit {
  user: User;
  fragebogen: Fragebogen;
  fragen: Frage[] = [];

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogen = FragebogenDetail.fragebogenDetail.fragebogen;
    this.user = User.user;
    alert(this.fragebogen.id + " " + this.fragebogen.name);
  }

  ngOnInit() {
    this.load();
    this.getFragen();
  }

  //Anpassen von 1 mit fragebogen.id
  getFragen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen_frage/' + this.fragebogen.id)
      .subscribe(async (data: any) => {
        data.forEach(element => {
          let frage: Frage = new Frage;
          frage.frage = element.frage;
          frage.id = element.id;
          frage.id_antwort = element.id_antwort;
          frage.id_fragebogen = element.id_fragebogen;
          frage.typ = element.typ;
          this.fragen.push(frage);
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  deleteFrage(frage: Frage) {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .delete('https://arcane-escarpment-45624.herokuapp.com/api/frage/' + frage.id, { headers })
      .subscribe(async (data: any) => {
        //alert(data);
      }, err => {
        console.log("failed");
      }, () => {
        this.fragen = [];
        this.getFragen();
      }
      );
  }

  load() {
    if (this.fragebogen == null) {
      this.router.navigateByUrl("/home");
    } else {
      this.getFragen();
    }
  }
}
