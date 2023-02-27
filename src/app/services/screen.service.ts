import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  Breakpoints = Breakpoints;
  screenSize: string;

  constructor(private breakpointObserver: BreakpointObserver) {
    if (this.breakpointObserver.isMatched('(min-width: 1440px)')) {
      this.screenSize = '(min-width: 1440px)';
    } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.screenSize = Breakpoints.Large;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.screenSize = Breakpoints.Medium;
    }
  }

  getBreakpoints() {
    return this.Breakpoints;
  }

  getSize(): string {
    return this.screenSize;
  }
}
