import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { ModalController } from '@ionic/angular';
import { CreateModifyPage } from "./create-modify/create-modify.page";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  records: { id: string; description: string; amount: number; type: string; }[];
  constructor(private service: GeneralService, public modalController: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }
  async update() {
    const modal = await this.modalController.create({
      component: CreateModifyPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  oneMoreRow() {
    let addrecord = {}
    addrecord['type'] = 'tipo';
    addrecord['description'] = 'description';
    addrecord['amount'] = 12.23;
    this.service.addGeneric("/Records/", addrecord)
  }
  getUsers() {
    this.service.getPath('/Records/').subscribe(res => {
      if (res) {
        this.records = res.map(e => {
          return {
            id: e.payload.doc.id,
            description: e.payload.doc.data()['description'],
            amount: e.payload.doc.data()['amount'],
            type: e.payload.doc.data()['type']
          }
        })
      }
    });
  }
  DeleteRecord(id) {
    this.service.deleteById('/Records/', id);
  }
  updateId(id) {
    let updaterecord = {}
    updaterecord['type'] = 'typeNew',
      updaterecord['description'] = 'descriptionNew',
      updaterecord['amount'] = 1010,
      this.service.updateGeneric('/Records/', id, updaterecord).then(res => {
        console.log(res)
      })
  }
}
