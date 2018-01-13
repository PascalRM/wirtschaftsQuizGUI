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
  selector: 'app-kategorie-detail',
  templateUrl: './kategorie-detail.component.html',
  styleUrls: ['./kategorie-detail.component.css']
})
export class KategorieDetailComponent implements OnInit {
  kategorieDetail: KategorieDetail;
  fragebogen: Fragebogen[] = [];
  user: User;
  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.kategorieDetail = KategorieDetail.kategorieDetail;
    this.user = User.user;
  }

  ngOnInit() {
    if (this.kategorieDetail.id_kategorie != null) {
      this.getFragebogen();
    } else {
      this.redirectKategorie();
    }
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
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  redirectKategorie() {
    this.router.navigateByUrl("/kategorie");
  }

  setFragebogen(id:number, fragebogen: Fragebogen) {
    FragebogenDetail.fragebogenDetail.id_fragebogen = id;
    FragebogenDetail.fragebogenDetail.fragebogen = fragebogen;
    this.router.navigateByUrl("/fragebogen");
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
