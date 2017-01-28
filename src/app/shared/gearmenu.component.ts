import { Component,
         OnInit,
         OnDestroy,
         Input } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-gear-menu',
  template: `
    <span class='dropdown'>
      <a aria-haspopup='true'
          class='dropdown-toggle'
          role='button'
          (click)='showMenu($event)'>
        <span class='glyphicon glyphicon-cog'></span>
      </a>
      <ul class='dropdown-menu gear-menu'>
        <li [attr.data-toggle]='i.data_toggle ? i.data_toggle : ""'
            [attr.data-target]='i.data_target ? i.data_target : ""'
            (click)='performAction(i.action);'
            *ngFor='let i of menuData' role='button'>
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

  constructor() { }

  ngOnInit() {
    $('html').click(function(e) {
      $('.gear-menu').each(function() {
        let m = $(this);
        if (m.is(':visible')) {
          m.hide();
        }
      });
    });
  }

  ngOnDestroy() {
    $('html').off('click');
  }

  showMenu(event) {
    event.stopImmediatePropagation();
    let menu = $(event.target).parent().parent().children('ul');

    if (menu.is(':visible')) {
      menu.hide();
      return;
    }
    menu.show();

    let left = event.clientX;
    let width = menu.width();
    let gearIconWidth = $(event.target).width();
    let offset = -width + gearIconWidth;
    let docWidth = $('.container').width();

    let isEntirelyVisible = (left + width <= docWidth);

    if (!isEntirelyVisible) {
      menu.css({left: offset + 'px'});
    } else {
      menu.css({left: '0px'});
    }
  }

  performAction(action) {
    if (!action) { return; }
    action.func.apply(action.context, action.args);
  }

}
