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
  frage: string = "";

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
        this.fragen = [];
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
    console.log(this.fragen);
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

  openAddFrageAntwort() {
    if (document.getElementById("form_frage").style.display == "none") {
      document.getElementById("form_frage").style.display = "block";
      document.getElementById('btn_add_logo').classList.remove("glyphicon-plus");
      document.getElementById('btn_add_logo').classList.add("glyphicon-remove");
      document.getElementById('btn_add').style.backgroundColor = '#d9534f';
      window.scrollTo(0, document.body.scrollHeight);
    } else if (document.getElementById("form_frage").style.display == "block") {
      document.getElementById("form_frage").style.display = "none";
      document.getElementById('btn_add_logo').classList.add("glyphicon-plus");
      document.getElementById('btn_add_logo').classList.remove("glyphicon-remove");
      document.getElementById('btn_add').style.backgroundColor = '#5cb85c';
    }
  }

  addFrageAntwort(fragee: HTMLInputElement, antwort: HTMLInputElement, f1: HTMLInputElement, f2: HTMLInputElement, f3: HTMLInputElement) {
    //Frage hinzufügen
    console.log(fragee.value + " " + antwort.value + " " + f1.value + " " + f2.value + " " + f3.value);
    this.frage = fragee.value;
    if (this.wertRadiobtn == "Multiplechoice") {
      this.addMultiplechoice(antwort.value, f1.value, f2.value, f3.value);
    } else if (this.wertRadiobtn == "Eingabe") {
      this.addEingabe(antwort.value);
    } else if (this.wertRadiobtn == "WahrFalsch") {
      this.addWahrfalsch();
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
        this.addFrage(ans.id, this.frage, 1);
      }
      );
  }

  addEingabe(antwortR) {
    //Antwort hinzufügen
    let ans;
    var data = {
      antwort: antwortR,
    }

    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/eingabe', data, { headers })
      .subscribe((data: any) => {
        ans = data;
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {
        this.addFrage(ans.id, this.frage, 2);
      }
      );
  }

  addWahrfalsch() {
    //Antwort hinzufügen
    let ans;
    var data = {
      antwort: this.wertRadiobtn_antwort,
    }

    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/truefalse', data, { headers })
      .subscribe((data: any) => {
        ans = data;
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {
        this.addFrage(ans.id, this.frage, 3);
      }
      );
  }


  addFrage(idantwort: number, fragestr: string, typnumb: number) {
    var data = {
      frage: fragestr,
      typ: typnumb,
      id_antwort: idantwort,
      id_fragebogen: this.fragebogen.id,
    }
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/frage', data, { headers })
      .subscribe((data: any) => {
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {
        this.load();
        document.getElementById("form_frage").style.display = "none";
        document.getElementById('btn_add_logo').classList.add("glyphicon-plus");
        document.getElementById('btn_add_logo').classList.remove("glyphicon-remove");
        document.getElementById('btn_add').style.backgroundColor = '#5cb85c';
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
      document.getElementById('btn_addFrageAntwort').style.display = "block";
    } else if (this.wertRadiobtn == "Eingabe") {
      document.getElementById("antwortEingabe").style.display = "block";
      document.getElementById("FalscheAntworten").style.display = "none";
      document.getElementById("antwortWahrfalsch").style.display = "none";
      document.getElementById('btn_addFrageAntwort').style.display = "block";
    } else if (this.wertRadiobtn == "WahrFalsch") {
      document.getElementById("antwortEingabe").style.display = "none";
      document.getElementById("FalscheAntworten").style.display = "none";
      document.getElementById("antwortWahrfalsch").style.display = "block";
      document.getElementById('btn_addFrageAntwort').style.display = "block";
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
    document.getElementById('btn_addFrageAntwort').style.display = "none";
  }
}
