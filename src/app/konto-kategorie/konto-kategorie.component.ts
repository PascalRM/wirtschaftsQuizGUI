import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Kategorie } from '../kategorie.model';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { KategorieDetail } from '../kategorie_detail.model';
import { Fragebogen } from '../fragebogen.model';
import { FragebogenDetail } from '../fragebogen_detail.model';

@Component({
  selector: 'app-konto-kategorie',
  templateUrl: './konto-kategorie.component.html',
  styleUrls: ['./konto-kategorie.component.css']
})
export class KontoKategorieComponent implements OnInit {
  kategorieDetail: KategorieDetail;
  fragebogen: Fragebogen[] = [];
  user: User;

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.user = User.user;
    this.kategorieDetail = KategorieDetail.kategorieDetail;
  }

  ngOnInit() {
    this.load();
    this.getFragebogen();
  }

  getFragebogen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie_fragebogen/' + this.kategorieDetail.id_kategorie)
      .subscribe(async (data: any) => {
        data.forEach(element => {
          let fragebog = new Fragebogen();
          fragebog.id = element.id;
          fragebog.name = element.name;
          fragebog.id_kategorie = element.id_kategorie;
          fragebog.id_user = element.id_user;
          this.fragebogen.push(fragebog);
          console.log(this.fragebogen);
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  deleteFragebogen(fragebog: Fragebogen) {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .delete('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen/' + fragebog.id, { headers })
      .subscribe(async (data: any) => {
      }, err => {
        console.log("failed");
        document.getElementById("infoKategorie").innerHTML = '<div id="fehlerFragebogen" class="alert alert-danger alert-dismissable" ><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Fehler!</strong> Dieser Fragebogen konnte nicht gelöscht werden</div>';
      }, () => {
        this.fragebogen = [];
        this.getFragebogen();
      }
      );
  }

  setFragebogen(fragebogen: Fragebogen) {
    FragebogenDetail.fragebogenDetail.id_fragebogen = fragebogen.id;
    FragebogenDetail.fragebogenDetail.fragebogen = fragebogen;
    this.router.navigateByUrl("/konto/fragebogen");
  }

  openAddFragebogen() {
    if (document.getElementById('form_fragebogen').style.display == "none") {
      document.getElementById('form_fragebogen').style.display = "block";
      document.getElementById('btn_add_logo').classList.remove("glyphicon-plus");
      document.getElementById('btn_add_logo').classList.add("glyphicon-remove");
      document.getElementById('btn_add').style.backgroundColor = '#d9534f';
    } else if (document.getElementById('form_fragebogen').style.display == "block") {
      document.getElementById('form_fragebogen').style.display = "none";
      document.getElementById('btn_add_logo').classList.add("glyphicon-plus");
      document.getElementById('btn_add_logo').classList.remove("glyphicon-remove");
      document.getElementById('btn_add').style.backgroundColor = '#5cb85c';
    }
  }

  addFragebogen(nameF: HTMLInputElement) {
    var data = {
      name: nameF.value,
      id_kategorie: this.kategorieDetail.id_kategorie,
      id_user: this.user.id,
    }
    console.log(data);
    var headers = new HttpHeaders().set("Authorization", "Bearer " + this.user.api_token);
    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/fragebogen', data, { headers })
      .subscribe((data: any) => {
      }, err => {
        console.log("Failed" + " " + err.value);
      }, () => {
        this.fragebogen = [];
        this.getFragebogen();
        document.getElementById('form_fragebogen').style.display = "none";
        document.getElementById("infoKategorie").innerHTML = '<div id="erfolgFragebogen" class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Erfolg!</strong> Der Fragebogen wurde erstellt</div>';

        document.getElementById('form_fragebogen').style.display = "none";
        document.getElementById('btn_add_logo').classList.add("glyphicon-plus");
        document.getElementById('btn_add_logo').classList.remove("glyphicon-remove");
        document.getElementById('btn_add').style.backgroundColor = '#5cb85c';
      }
      );
  }

  routeHome() {
    this.router.navigateByUrl("/home");
  }

  routeKonto(){
    this.router.navigateByUrl("/konto");
  }

  load() {
    if (this.user.api_token == null) {
      this.router.navigateByUrl("/login");
    }

    document.getElementById('form_fragebogen').style.display = "none";
  }
}
