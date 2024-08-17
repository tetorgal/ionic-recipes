import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor() { }

  pages = [
    { title: 'Inicio', url: 'home', icon: 'home' }
  ]

  ngOnInit() {
  }

}
