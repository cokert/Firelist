import { Injectable,
         HostListener } from '@angular/core';

@Injectable()
export class ScreenSizeService {

  private _screenPhoneSize = 768;

  screenIsPhoneSized = false;

  constructor() {
    this.checkWindowSize(window.innerWidth);
    window.addEventListener('resize', event => this.checkWindowSize((event.target as any).innerWidth));
  }

  private checkWindowSize(width) {
    this.screenIsPhoneSized = width < this._screenPhoneSize;
    console.log('phone sized', this.screenIsPhoneSized);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkWindowSize(event.target.innerWidth);
  }
}
