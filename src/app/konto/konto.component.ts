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
import { FragebogenComponent } from '../fragebogen/fragebogen.component';

@Component({
  selector: 'app-konto',
  templateUrl: './konto.component.html',
  styleUrls: ['./konto.component.css']
})

export class KontoComponent implements OnInit {
  user: User;
  kategorien: Kategorie[] = [];
  fragebogen: Fragebogen[] = [];
  fragebogenKategorie: Fragebogen[] = [];
  requestFinished: boolean = false;

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.user = User.user;
  }

  ngOnInit() {
    this.load();
    this.getKategorie();
    this.getFragebogen();
  }

  getKategorie() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie')
      .subscribe((data: any) => {
        data.forEach(element => {
          if (element.id_user == this.user.id) {
            let kat = new Kategorie();
            kat.id = element.id;
            kat.name = element.kategorie;
            kat.ersteller = element.id_user
            this.kategorien.push(kat);
          }
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  getFragebogen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen')
      .subscribe((data: any) => {
        data.forEach(element => {
          if (element.id_user == this.user.id) {
            let fragebog = new Fragebogen();
            fragebog.id = element.id;
            fragebog.name = element.name;
            fragebog.id_kategorie = element.id_kategorie;
            fragebog.id_user = element.id_user;
            this.fragebogen.push(fragebog);
          }
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  setFragebogenDetail(fragebog: Fragebogen) {
    FragebogenDetail.fragebogenDetail.fragebogen = fragebog;
    this.router.navigateByUrl("/konto/fragebogen");
  }

  setKategorieDetail(kategorie: Kategorie) {
    KategorieDetail.kategorieDetail.kategorie = kategorie;
    KategorieDetail.kategorieDetail.id_kategorie = kategorie.id;
    this.router.navigateByUrl("/konto/kategorie");
  }

  getFragebogenfuerKategorie(kat: Kategorie) {
    this.requestFinished = false;
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie_fragebogen/' + kat.id)
      .subscribe((data: any) => {
        data.forEach(element => {
          let fragebog = new Fragebogen();
          fragebog.id = element.id;
          fragebog.name = element.name;
          fragebog.id_kategorie = element.id_kategorie;
          fragebog.id_user = element.id_user;
          this.fragebogenKategorie.push(fragebog);
        });
      }, err => {
        console.log("failed");
      }, () => {
        this.deleteKategorien(kat);
      }
      );
  }



  deleteFragebogen(fragebog: Fragebogen) {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .delete('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen/' + fragebog.id, { headers })
      .subscribe((data: any) => {
        //alert(data);
      }, err => {
        console.log("failed");
        document.getElementById("infoKategorie").innerHTML = '<div id="fehlerFragebogen" class="alert alert-danger alert-dismissable" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Fehler!</strong> Dieser Fragebogen konnte nicht gelöscht werden</div>';
      }, () => {
        document.getElementById("infoKategorie").innerHTML = '<div id="erfolgFragebogen" class="alert alert-success alert-dismissable" style="display: none;"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Erfolg!</strong> Dieser Fragebogen wurde gelöscht</div>';
        this.fragebogen = [];
        this.getFragebogen();
      }
      );
  }

  //Falls die Kategorie Fragebogen beinhaltet kann sie nicht gelöscht werden
  deleteKategorien(kat: Kategorie) {
    if (this.fragebogenKategorie.length == 0) {
      //Kategorie wird gelöscht
      var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
      this.http
        .delete('https://arcane-escarpment-45624.herokuapp.com/api/kategorie/' + kat.id, { headers })
        .subscribe(async (data: any) => {
          //alert(data);
        }, err => {
          console.log("failed");
        }, () => {
          this.kategorien = [];
          this.getKategorie();
          document.getElementById("infoKategorie").innerHTML = "<div id='erfolgKategorie' class='alert alert-success alert-dismissable' ><a href='#' class='close' data-dismiss='alert' aria-label='close'>×</a><strong>Erfolg!</strong> Diese Kategorie wurde gelöscht</div>";
        }
        );
    } else {
      document.getElementById("infoKategorie").innerHTML = '<div id="fehlerKategorie" class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Fehler!</strong> Diese Kategorie beinhaltet noch Fragenbogen und kann nicht gelöscht werden.</div>';
      console.log("error");
    }
  }

  addFragebogen(name: HTMLInputElement){
    if(document.getElementById('form_fragebogen').style.display == "none"){
      document.getElementById('form_fragebogen').style.display = "block";
    }else if(document.getElementById('form_fragebogen').style.display == "block"){
      console.log();
    }
  }

  load() {
    if (this.user.api_token == null) {
      this.router.navigateByUrl("/login");
    }
  }
}
