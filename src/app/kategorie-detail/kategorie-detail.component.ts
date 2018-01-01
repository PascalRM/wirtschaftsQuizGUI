import { Component, OnInit } from '@angular/core';
import { KategorieDetail } from '../kategorie_detail.model';

@Component({
  selector: 'app-kategorie-detail',
  templateUrl: './kategorie-detail.component.html',
  styleUrls: ['./kategorie-detail.component.css']
})
export class KategorieDetailComponent implements OnInit {
  kategorieDetail : KategorieDetail;

  constructor() {
    this.kategorieDetail = KategorieDetail.kategorieDetail;
  }

  ngOnInit() {
  }

}
