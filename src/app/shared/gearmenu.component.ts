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
      <ul class="dropdown-menu">
        <li [attr.data-toggle]="i.data_toggle ? i.data_toggle : ''"
            [attr.data-target]="i.data_target ? i.data_target : ''"
            (click)="performAction(i.action);"
            *ngFor="let i of menuData" role="button">
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
    if (!action) return;
    action.func.apply(action.context, action.args);
  }

}
