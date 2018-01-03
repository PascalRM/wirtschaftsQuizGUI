import {
  Component, OnInit, ViewChild,
  AfterViewInit,
  ElementRef,
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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, AfterViewInit {
  fragebogenDeatil: FragebogenDetail; //Enthält den Fragebogen
  frage: Frage = new Frage; //Die aktuelle Frage
  fragenAusstehend: Frage[];
  fertig: boolean = false;

  //Eingabefeld
  textfeld: string = "";

  //Radiobutton werte
  radio1: string = "";
  radio2: string = "";
  radio3: string = "";
  radio4: string = "";

  //Wert von ausgewählten radio button
  wertRadiobtn: string = "";

  //Ausgabe
  result: string = "";

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogenDeatil = FragebogenDetail.fragebogenDetail;
  }

  ngOnInit() {
    this.load();
    console.log(this.fragenAusstehend);
  }

  ngAfterViewInit() {
  }

  starten(){
    document.getElementById('start').style.display = "none";
    this.fragenAusstehend = this.fragebogenDeatil.fragen;
    this.naechsteFrage();
  }

  naechsteFrage() {
    //Frage wird aus dem Array ausgelesen und aus dem Array entfernt
    console.log("Ausstehend:" + this.fragenAusstehend.length);
    if (this.fragenAusstehend.length == 0) {
      this.fertig = true;
    } else {
      this.frage = this.fragenAusstehend.pop();
    }
    this.result = "";

    //Es wird ermittelt um welchen Fragetyp ees sich handelt und die dazugehörigen Eingabemöglickeiten werden angezeigt
    switch (this.frage.typ) {

      //Multiplechoice
      case 1:
        document.getElementById('radiobutton').style.display = "";
        document.getElementById('textfeld').style.display = "none";
        document.getElementById('wahrfalsch').style.display = "none";

        let richtigeAntwort = this.getRandomInt(1, 4);

        console.log(richtigeAntwort);
        //Die richtige Anwort wird gesetzt
        switch (richtigeAntwort) {
          case 1:
            this.radio1 = this.frage.antwort;
            this.radio2 = this.frage.falscheAntworten[0];
            this.radio3 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 2:
            this.radio2 = this.frage.antwort;
            this.radio1 = this.frage.falscheAntworten[0];
            this.radio3 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 3:
            this.radio3 = this.frage.antwort;
            this.radio2 = this.frage.falscheAntworten[0];
            this.radio1 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 4:
            this.radio4 = this.frage.antwort;
            this.radio2 = this.frage.falscheAntworten[0];
            this.radio3 = this.frage.falscheAntworten[1];
            this.radio1 = this.frage.falscheAntworten[2];
            break;
          default:
            console.log("Fehler: switch");
            break;
        }

        break;

      //Eingabe
      case 2:
        document.getElementById('textfeld').style.display = "";
        document.getElementById('radiobutton').style.display = "none";
        document.getElementById('wahrfalsch').style.display = "none";
        break;

      //Wahrfalsch
      case 3:
        document.getElementById('wahrfalsch').style.display = "";
        document.getElementById('textfeld').style.display = "none";
        document.getElementById('radiobutton').style.display = "none";
        break;
      default:
        console.log("Fehler: switch");
        break;
    }


    console.log(this.textfeld)
  }

  ueberpruefen() {

    //Eingabe
    switch (this.frage.typ) {
      //Multiplechoice
      case 1:
        if (this.frage.antwort == this.wertRadiobtn) {
          this.result = "richtig";
        } else {
          this.result = "falsch";
        }
        break;

      //Eingabe
      case 2:
        if (this.frage.antwort.toLowerCase() == this.textfeld.toLowerCase()) {
          this.result = "richtig";
        } else {
          this.result = "falsch";
        }
        break;

      //Wahrfalsch
      case 3:
        let antowrtBoolean: string;

        if (this.wertRadiobtn == "wahr") {
          antowrtBoolean = "true";
        } else {
          antowrtBoolean = "false";
        }

        if (this.frage.antwort.toString() == antowrtBoolean.toLowerCase()) {

          this.result = "richtig";
        } else {
          this.result = "falsch";
        }
        break;
      default:
        console.log("Fehler: switch");
        break;
    }

  }

  load() {
    if (this.fragebogenDeatil.fragebogen == null) {
      this.router.navigateByUrl("/kategorie");
    } else {
      document.getElementById('textfeld').style.display = "none";
      document.getElementById('radiobutton').style.display = "none";
      document.getElementById('wahrfalsch').style.display = "none";
    }
  }

  radioChangeHandler(event: any) {
    this.wertRadiobtn = event.target.value;
    console.log(this.wertRadiobtn)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
