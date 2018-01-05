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
  wertRadiobtn: string = "";
  wertRadiobtn_antwort: boolean;

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogen = FragebogenDetail.fragebogenDetail.fragebogen;
    this.user = User.user;
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

  addFrage(fragee: HTMLInputElement, antwort: HTMLInputElement, f1: HTMLInputElement, f2: HTMLInputElement, f3: HTMLInputElement) {
    if (document.getElementById("form_frage").style.display == "none") {
      document.getElementById("form_frage").style.display = "block";
    } else if (document.getElementById("form_frage").style.display == "block") {
      //Frage hinzufügen
      console.log(fragee.value + " " + antwort.value + " " + f1.value + " " + f2.value + " " + f3.value);
      console.log(this.addMultiplechoice(antwort.value,f1.value,f2.value,f3.value));
    }

  }

  addMultiplechoice(antwortR, falsch1, falsch2, falsch3) {
    //Antwort hinzufügen
    let ans;
    var data = {
      antwort: antwortR,
      falscheantwort1: falsch1,
      falscheantwort2: falsch2,
      falscheantwort3: falsch3,
    }

    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/multiplechoice', data, { headers })
      .subscribe((data: any) => {
        ans = data;
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {

      }
      );
  }

  radioChangeHandler(event: any) {
    this.wertRadiobtn = event.target.value;
    console.log(this.wertRadiobtn)
    if (this.wertRadiobtn == "Multiplechoice") {
      document.getElementById("antwortEingabe").style.display = "block";
      document.getElementById("FalscheAntworten").style.display = "block";
      document.getElementById("antwortWahrfalsch").style.display = "none";
    } else if (this.wertRadiobtn == "Eingabe") {
      document.getElementById("antwortEingabe").style.display = "block";
      document.getElementById("FalscheAntworten").style.display = "none";
      document.getElementById("antwortWahrfalsch").style.display = "none";
    } else if (this.wertRadiobtn == "WahrFalsch") {
      document.getElementById("antwortEingabe").style.display = "none";
      document.getElementById("FalscheAntworten").style.display = "none";
      document.getElementById("antwortWahrfalsch").style.display = "block";
    }
  }

  radioChangeHandlerWahrfalsch(event: any) {
    if (event.target.value == "Wahr") {
      this.wertRadiobtn_antwort = true;
    } else if (event.target.value == "Falsch") {
      this.wertRadiobtn_antwort = false;
    }
  }

  load() {
    if (this.fragebogen == null) {
      this.router.navigateByUrl("/home");
    }
    this.getFragen();

    document.getElementById("form_frage").style.display = "none";

    document.getElementById("antwortEingabe").style.display = "none";
    document.getElementById("FalscheAntworten").style.display = "none";
    document.getElementById("antwortWahrfalsch").style.display = "none";
  }
}
