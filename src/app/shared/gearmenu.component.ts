import { Component,
         OnInit,
         OnDestroy,
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
export class GearMenuComponent implements OnInit, OnDestroy {
  @Input() menuData = null;

  private _menu = null;

  constructor() { console.log('gearmenu'); }

  ngOnInit() {
    $('html').click(function(e) {
      console.log("gearmenu click", this._menu);
      if (this._menu && this._menu.is(':visible')) {
        console.log("hiding?");
        this._menu.hide();
      }
    });
  }

  ngOnDestroy() { console.log('gearmenu destroy'); }

  showMenu(event) {
    this._menu = $(event.target).parent().parent().children('ul');

    if (this._menu.is(':visible')) {
      this._menu.hide();
      return;
    }
    this._menu.show();

    var left = event.clientX;
    var width = this._menu.width();
    var gearIconWidth = $(event.target).width();
    var offset = -width + gearIconWidth;
    var docWidth = $(".container").width();

    var isEntirelyVisible = (left + width <= docWidth);

    if (!isEntirelyVisible) {
      this._menu.css({left: offset + 'px'});
    } else {
      this._menu.css({left: '0px'});
    }
  }

  performAction(action) {
    if (!action) return;
    action.func.apply(action.context, action.args);
    this._menu.hide();
  }

}
