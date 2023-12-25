// import { Component } from '@angular/core';

import { AfterViewInit, Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  // styleUrls: ['./user.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../assets/user/css/core-style.css",
    "../../assets/user/css/style.css",
    "../../assets/user/css/responsive.css"
  ]
})
export class UserComponent implements AfterViewInit {
  title = 'Doan5';
  ngAfterViewInit(): void {
    var src = ["assets/user/js/jquery/jquery-2.2.4.min.js",
    "assets/user/js/popper.min.js",
    "assets/user/js/bootstrap.min.js",
    "assets/user/js/plugins.js",
    "assets/user/js/active.js",
  ];

 

   src.forEach(element => {
    var the = document.createElement('script');
    the.src = element;
    document.body.appendChild(the);
   });
}
}
