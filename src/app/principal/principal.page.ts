import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  doc: any;
  records: { id: string; description: string; amount: number; type: string; }[];
  addrecord: {type: string ; description: string; amount: number};  

  constructor(private menu: MenuController, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.add();
    this.AddRecord("tipo","descrip",12);
  }
  add(){
    this.addrecord = {type :'', description :'', amount: null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      console.log(res)
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            description: e.payload.doc.data()['description'],
            amount: e.payload.doc.data()['amount'],
            type: e.payload.doc.data()['type']
          }
        })   
      }  
    })
  }
  AddRecord(type, description, amount){
    let addrecord = {}
    addrecord['type'] = type
    addrecord['description'] = description
    addrecord['amount'] = amount
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {type :'', description :'', amount: null} 
    })
  }
  /*async UpdateRecord(id, type, description, amount) {
    const modal = await this.modalController.create({
      component:  UpdaterecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {          
          'id': id,
          'type': type,
          'description': description,
          'amount': amount,
      }
    });
    return await modal.present();
  }*/
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }
  toggleMenu() {
    this.menu.toggle();
  }

}
