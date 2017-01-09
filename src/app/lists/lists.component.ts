import { Component,
         OnInit,
         HostListener } from '@angular/core';

import { ListsService } from './lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  private _hideListOnSelecting = false;
  private _windowSizeForHiding = 768;

  constructor(private _lists : ListsService) { }

  ngOnInit() {
    this.checkWindowSize(window.innerWidth);
  }

  private checkWindowSize(width) {
    this._hideListOnSelecting = width < this._windowSizeForHiding;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkWindowSize(event.target.innerWidth);
  }

}
