import { Model } from './../models/model';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  fbitems: Observable<Model[]>;
  model:Model;
  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider) {

    //this.firebaseProvider.addItem({FIRSTNAME:'imran',LASTNAME:'bajwa',AGE:'35',OCCUPATION:'pro'});

    this.fbitems =this.firebaseProvider.getItems().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.fbitems);


    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  removeItem(key){
    console.log('removeItem with : '+key);
    this.firebaseProvider.removeItem(key);
  }

  updateItem(key){
    console.log('UpdateItem [key] : '+key);
   let data={FIRSTNAME:'changeFN',LASTNAME:'changeLN'};
    this.firebaseProvider.updateItem(key,data);
  }

  //addItem(model:Model){
    addItem(){
    //console.log('addItem ');
    //console.log(model);
    this.firebaseProvider.addItem({FIRSTNAME:'imran',LASTNAME:'bajwa',AGE:'35',OCCUPATION:'pro'});
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
