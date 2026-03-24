import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, Input, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isScrolled: boolean = false

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return
    this.isScrolled = window.scrollY > 10
  }
}
