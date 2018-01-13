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
  user: User;

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogen = FragebogenDetail.fragebogenDetail.fragebogen;
    this.user = User.user;
  }

  ngOnInit() {
    this.load();
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

  start() {
    console.log(this.fragen);
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
          try{

          this.fragen[i].antwort = element.antwort;
          //console.log(i + "|" + this.fragen[i].id +  " | " + this.fragen[i].frage + " | " +  this.fragen[i].typ +  " " + element.antwort);
          }catch(exp){
            alert(exp + " , " + this.fragen[i] + " , " + i)
          }
          if (typ == 1) {
            this.fragen[i].falscheAntworten.push(element.falscheantwort1);
            this.fragen[i].falscheAntworten.push(element.falscheantwort2);
            this.fragen[i].falscheAntworten.push(element.falscheantwort3);
          }

        }, err => {
          console.log(err);
        }
        );

        FragebogenDetail.fragebogenDetail.fragen = this.fragen;
        this.router.navigateByUrl("/quiz");
    }
  }

  routeLogin() {
    this.router.navigateByUrl("/login");
  }

  routeHome(){
    this.router.navigateByUrl("/home");
  }

  routeKonto(){
    this.router.navigateByUrl("/konto");
  }

  routeRegistrieren() {
    this.router.navigateByUrl("/registrieren");
  }

  load() {
    if (this.fragebogen == null) {
      this.router.navigateByUrl("/kategorie");
    } else {
      this.getFragen();
    }
  }
}
