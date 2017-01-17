import { Component,
         OnInit,
         Input } from '@angular/core';

@Component({
  selector: 'app-gear-menu',
  template: `
    <span class="dropdown">
      <a aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
           <span class="glyphicon glyphicon-cog"></span>
           <!--<span class="caret"></span>-->
      </a>
      <ul class="dropdown-menu app-lisfts">
        <li (click)=performAction(i.action) *ngFor="let i of menuData" role="button">
          <a class="hand">
            {{ i.label }}
          </a>
        </li>
      </ul>
  </span>`
})
export class GearMenuComponent implements OnInit {
  @Input() menuData = null;

  constructor() { console.log('gearmenu'); }

  ngOnInit() { }

  performAction(action) {
    action.func.apply(action.context, action.args);
  }

}
