import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Kategorie } from '../kategorie.model';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { KategorieDetail } from '../kategorie_detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {
  user: User = User.getUser();
  kategorien: Kategorie[] = [];
  kategorieDetail: KategorieDetail;

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.user = User.getUser();
    this.kategorieDetail = KategorieDetail.kategorieDetail;

  }

  ngOnInit() {
    this.getKategorie();
  }

  getKategorie() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie')
      .subscribe((data: any) => {
        data.forEach(element => {
          let kat = new Kategorie();
          kat.id = element.id;
          kat.name = element.kategorie;
          kat.ersteller = element.id_user
          this.kategorien.push(kat);
        });
      }, err => {
        console.log("login failed");
      }
      );
  }

  loadKategorieDetail(id: number,kategorie:Kategorie) {
    this.kategorieDetail.id_kategorie = id;
    this.kategorieDetail.kategorie = kategorie;
    this.router.navigateByUrl("/details");
  }
  
  routeLogin(){
    this.router.navigateByUrl("/login");
  }

  routeRegistrieren(){
    //
  }

}
