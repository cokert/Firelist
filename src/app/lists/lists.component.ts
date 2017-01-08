import { Component, OnInit } from '@angular/core';

import { ListsService } from './lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private _lists : ListsService) { }

  ngOnInit() {
  }

}
