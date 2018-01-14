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
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  fragebogenDeatil: FragebogenDetail; //Enthält den Fragebogen
  frage: Frage = new Frage; //Die aktuelle Frage
  fragenAusstehend: Frage[];
  fertig: boolean = false;
  user: User;

  naechsteKnopf: boolean = true;
  ueberpruefenKnopf: boolean = false;

  anzRichtige: number = 0;
  anzFalsche: number = 0;

  //Eingabefeld
  textfeld: string = "";

  //Radiobutton werte
  radio1: string = "";
  radio2: string = "";
  radio3: string = "";
  radio4: string = "";

  //Wert von ausgewählten radio button
  wertRadiobtn: string = "";
  //Enthält namen des Radiobuttons der die Richtige Antwort enthält
  nameRadiobtn: string = "";

  //Ausgabe
  result: string = "";

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogenDeatil = FragebogenDetail.fragebogenDetail;
    this.user = User.user;
  }

  ngOnInit() {
    this.load();
  }

  starten() {
    document.getElementById('start').style.display = "none";
    document.getElementById('score').style.display = "";

    document.getElementById('quiz').style.display = "";
    this.fertig = false;

    this.fragenAusstehend = this.fragebogenDeatil.fragen.slice(0);
    this.naechsteFrage();
  }

  /*
  *****************************************
    Funtktion zum laden der nächsten Frage
  *****************************************
  */

  naechsteFrage() {
    document.getElementById('naechsteFrage').classList.add("disabled");

    document.getElementById('radio1').classList.remove("green");
    document.getElementById('radio2').classList.remove("green");
    document.getElementById('radio3').classList.remove("green");
    document.getElementById('radio4').classList.remove("green");

    (<HTMLFormElement>document.getElementById('form_radio')).reset();
    (<HTMLFormElement>document.getElementById('form_wahrfalsch')).reset();
    (<HTMLFormElement>document.getElementById('form_text')).reset();

    document.getElementById('textfeld').classList.remove('green');
    document.getElementById('wahr').classList.remove('green');
    document.getElementById('falsch').classList.remove('green');

    this.ueberpruefenKnopf = false;
    this.naechsteKnopf = true;

    //Frage wird aus dem Array ausgelesen und aus dem Array entfernt
    if (this.fragenAusstehend.length == 0) {
      this.fertig = true;
      this.resultatAnzeigen();
      document.getElementById("naechsteFrage").textContent = "Nächste Frage";
    } else if (this.fragenAusstehend.length == 1) {
      document.getElementById("naechsteFrage").textContent = "Beenden";
      this.frage = this.fragenAusstehend.pop();
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

        //Die richtige Anwort wird gesetzt
        switch (richtigeAntwort) {
          case 1:
            this.radio1 = this.frage.antwort;
            this.nameRadiobtn = "radio1";
            this.radio2 = this.frage.falscheAntworten[0];
            this.radio3 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 2:
            this.radio2 = this.frage.antwort;
            this.nameRadiobtn = "radio2";
            this.radio1 = this.frage.falscheAntworten[0];
            this.radio3 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 3:
            this.radio3 = this.frage.antwort;
            this.nameRadiobtn = "radio3";
            this.radio2 = this.frage.falscheAntworten[0];
            this.radio1 = this.frage.falscheAntworten[1];
            this.radio4 = this.frage.falscheAntworten[2];
            break;
          case 4:
            this.radio4 = this.frage.antwort;
            this.nameRadiobtn = "radio4";
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
  }

  /*
  *****************************************
    Funtktion zur Überprüfung des Antworts
  *****************************************
  */

  ueberpruefen() {
    //Eingabe
    switch (this.frage.typ) {
      //Multiplechoice
      case 1:
        if (this.frage.antwort == this.wertRadiobtn) {
          this.result = "richtig";
          document.getElementById("result").style.color = "#5cb85c";
          document.getElementById(this.nameRadiobtn).classList.add("green");
          this.anzRichtige++;
        } else {
          this.result = "falsch";
          document.getElementById("result").style.color = "#d9534f";
          this.anzFalsche++;
        }
        break;

      //Eingabe
      case 2:
        if (this.frage.antwort.toLowerCase() == this.textfeld.toLowerCase()) {
          this.result = "richtig";
          document.getElementById("result").style.color = "#5cb85c";
          document.getElementById("textfeld").classList.add('green');
          this.anzRichtige++;
        } else {
          this.result = "falsch";
          document.getElementById("result").style.color = "#d9534f";
          this.anzFalsche++;
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
          document.getElementById("result").style.color = "#5cb85c";
          document.getElementById(this.wertRadiobtn).classList.add('green');
          this.anzRichtige++;
        } else {
          document.getElementById("result").style.color = "#d9534f";
          this.result = "falsch";
          this.anzFalsche++;
        }
        break;
      default:
        console.log("Fehler: switch");
        break;
    }

    if (this.result == "richtig") {
      this.ueberpruefenKnopf = true;
      this.naechsteKnopf = false;

      document.getElementById('naechsteFrage').classList.remove("disabled");
    }

  }

  /*
  *****************************************
    Vorbereitungen werden getroffen
  *****************************************
  */

  load() {
    if (this.fragebogenDeatil.fragebogen == null) {
      this.router.navigateByUrl("/kategorie");
    } else {
      document.getElementById('textfeld').style.display = "none";
      document.getElementById('radiobutton').style.display = "none";
      document.getElementById('wahrfalsch').style.display = "none";
      document.getElementById('quiz').style.display = "none";
      document.getElementById('resulat').style.display = "none";
      document.getElementById('score').style.display = "none";
    }
  }


  resultatAnzeigen() {
    document.getElementById('quiz').style.display = "none";

    document.getElementById('resulat').style.display = "";
  }

  wiederholen() {

    this.naechsteKnopf = true;
    this.ueberpruefenKnopf = false;

    this.anzRichtige = 0;
    this.anzFalsche = 0;

    document.getElementById('score').style.display = "none";
    document.getElementById('resulat').style.display = "none";
    document.getElementById('start').style.display = "";
  }


  radioChangeHandler(event: any) {
    this.wertRadiobtn = event.target.value;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
}
