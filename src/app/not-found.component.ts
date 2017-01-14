import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Not Found</h1>',
  styleUrls: ['./app.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('notfound component init');
  }

}
