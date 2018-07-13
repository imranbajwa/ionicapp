import { ListPage } from './../list/list';
import { Model } from './../models/model';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component, ViewChild } from '@angular/core';
import { NavController,Nav } from 'ionic-angular';


@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  @ViewChild(Nav) nav: Nav;
  model:Model;
  constructor(public navCtrl: NavController,public firebaseProvider: FirebaseProvider) {
    this.model={
      FIRSTNAME:'',
      LASTNAME:'',
      AGE:'',
      OCCUPATION:''
    };
  }

  addItem(model:Model){
    console.log('addItem ');
    console.log(model);
    this.firebaseProvider.addItem(model);

    this.navCtrl.push(ListPage);
   

  }

}
