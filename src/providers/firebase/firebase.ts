import { Model } from './../../pages/models/model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList  } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {
  itemsRef: AngularFireList<any>;
  constructor(public db: AngularFireDatabase) {
   this.itemsRef=db.list<Model>('/data/');
   }
  getItems() {
    //return this.db.list<Model>('/data/');
    return this.itemsRef;
  }
  addItem(model:Model) {
    this.itemsRef.push(model);
  }
  removeItem(key) {
    this.db.list('/data/').remove(key);
  }
  updateItem(key: string, data: any) {
    this.itemsRef.update(key, data);
  }
 
}