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
        //alert(data);
      }, err => {
        console.log("failed");
      }, () => {
        this.fragebogen = [];
        this.getFragebogen();
        this.router.navigateByUrl("/konto")
      }
      );
  }

  setFragebogen(fragebogen: Fragebogen) {
    FragebogenDetail.fragebogenDetail.id_fragebogen = fragebogen.id;
    FragebogenDetail.fragebogenDetail.fragebogen = fragebogen;
    this.router.navigateByUrl("/konto/fragebogen");
  }

  load() {
    if (this.user.api_token == null) {
      this.router.navigateByUrl("/login");
    }
  }
}
