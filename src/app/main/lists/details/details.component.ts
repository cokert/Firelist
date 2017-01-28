import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() activeList = null;
  @Input() activeListKey = null;

  constructor() { }

  ngOnInit() {
  }

}
