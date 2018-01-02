import { Component, OnInit } from '@angular/core';
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
import { Fragen} from '../fragen_detail.model';

@Component({
  selector: 'app-fragebogen',
  templateUrl: './fragebogen.component.html',
  styleUrls: ['./fragebogen.component.css']
})
export class FragebogenComponent implements OnInit {

  fragen: Frage[] = [];
  fragebogen: Fragebogen = new Fragebogen();


  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogen = FragebogenDetail.fragebogenDetail.fragebogen;
  }

  ngOnInit() {
    this.load();
  }

  getFragen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen_frage/' + 1)
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

  start() {
    for (let i = 0; i < this.fragen.length; i++) {
      let url;
      let typ = this.fragen[i].typ;
      //URL bestimmen aufgrund des Fragentyps
      switch (this.fragen[i].typ) {
        case 1:
          url = 'https://arcane-escarpment-45624.herokuapp.com/api/multiplechoice/' + this.fragen[i].id_antwort;
          break;
        case 2:
          url = 'https://arcane-escarpment-45624.herokuapp.com/api/eingabe/' + this.fragen[i].id_antwort;
          break;
        case 3:
          url = 'https://arcane-escarpment-45624.herokuapp.com/api/truefalse/' + this.fragen[i].id_antwort;
          break;
        default:
          console.log("Fehler: Fragentyp fehlerhaft");
      }
      //Antwort speichern aufgrund des Fragentyps
      this.http
        .get(url)
        .subscribe((element: any) => {
          this.fragen[i].antwort = element.antwort;
          if (typ == 1) {
            this.fragen[i].falscheAntworten.push(element.falscheantwort1);
            this.fragen[i].falscheAntworten.push(element.falscheantwort2);
            this.fragen[i].falscheAntworten.push(element.falscheantwort3);
          }

        }, err => {
          console.log(err);
        }
        );

        Fragen.fragen.alleFragen = this.fragen;
    }
  }

  load() {
    if (this.fragebogen == null) {
      this.router.navigateByUrl("/kategorie");
    } else {
      this.getFragen();
    }
  }
}
