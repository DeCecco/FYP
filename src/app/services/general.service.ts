import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(public alertController: AlertController, private firestore: AngularFirestore) { }

  /*--   Modal Confirm   --*/

  async alertConfirm(type, head = 'Confirm!', msj = 'Are you sure?', yes = 'Okay', no = 'Cancel') {
    var z = '';
    switch (type) {
      case 0:
        z = 'It is about to leave without recording. Are you sure?';
        break;
      case 1:
        break;
      case 2:
        z = 'Are you sure you want to delete the selected item?';
        break;
      default:
        z = z;
        break;
    }
    const prompt = await this.alertController.create({
      header: 'Attention',
      message: z,
      buttons: [
        {
          text: no,
          role: 'no',
          cssClass: 'secondary',
          handler: () => {
            prompt.dismiss();
            return false;
          }
        }, {
          text: yes,
          role: 'yes',
          handler: () => {
            return true;

          }
        }
      ]
    });
    await prompt.present();
    const result = await prompt.onDidDismiss();
    return result;
  }

  /*--   Delete by ID   --*/

  deleteById(path: string, id: number) {
    this.alertConfirm(2).then(response => {
      if (response.role === 'yes') {
        let res = this.firestore.doc(path + id).delete()
      }
    })
  }
  getPath(path){
   return this.firestore.collection(path).snapshotChanges();
  }
  addGeneric(path,data){
    return this.firestore.collection(path).add(data);
  }
  updateGeneric(path,id,data){
    return this.firestore.doc(path + id).update(data);
  }
  addByPath(path: string, data: object) {
    let addrecord = {}
    let test = [];
    let addrecord2: { type: string; description: string; amount: number };
    test.forEach(element => {
      test[element]=element;
    });
    for (let key in data[0]) {
      data[key] = data[0][key]
    }
    /*addrecord['type'] = type
    addrecord['description'] = description
    addrecord['amount'] = amount
    console.log(addrecord)*/
    this.firestore.collection(path).add(addrecord).then(() => {
     // this.addrecord = { type: '', description: '', amount: null }
    })
  }
}
