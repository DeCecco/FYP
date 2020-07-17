import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})



export class MenuComponent implements OnInit {

    menu;

  constructor() {
    this.menu = [
      {
      
      label: "Sarasa",
      icon: "saraasa"
      
    },
    {
      label: "pablo el trolo",
      icon:"gayman"
    }
  ]
   }

  ngOnInit() {}

}

// export interface Menu{
//   label: string;
//   icon: string;
//   submenu?: Menu;
// }