import { Component,
         OnInit,
         Input } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-gear-menu',
  template: `
    <span class="dropdown">
      <a aria-haspopup="true"
         class="dropdown-toggle"
         role="button"
         (click)="showMenu($event)">
       <span class="glyphicon glyphicon-cog"></span>
      </a>
      <ul class="dropdown-menu gear-menu">
        <li [attr.data-toggle]="i.data_toggle ? i.data_toggle : ''"
            [attr.data-target]="i.data_target ? i.data_target : ''"
            (click)="performAction(i.action);"
            *ngFor="let i of menuData" role="button">
          <a>
            {{ i.label }}
          </a>
        </li>
      </ul>
  </span>`,
  styles: [`
    .edge {
      right: 0px;
    }`]
})
export class GearMenuComponent implements OnInit {
  @Input() menuData = null;

  constructor() { console.log('gearmenu'); }

  ngOnInit() { }

  showMenu(event) {
    var gearWidth = $(event.target).width();
    var elem = $(event.target).parent().parent().children('ul');

    if (elem.is(':visible')) {
      elem.hide();
      return;
    }

    elem.show();

    var left = event.clientX;
    var width = elem.width();

    var offset = -width + gearWidth;

    var docWidth = $(".container").width();

    var isEntirelyVisible = (left + width <= docWidth);

    if (!isEntirelyVisible) {
      console.log("shifting");
      elem.css({left: offset + 'px'});
    } else {
      console.log("NOT shifting");
      elem.css({left: '0px'});
    }
  }

  performAction(action) {
    if (!action) return;
    action.func.apply(action.context, action.args);
  }

}
