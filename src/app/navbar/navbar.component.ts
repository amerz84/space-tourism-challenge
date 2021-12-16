import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  innerWidth!: number;
  isMobile!: boolean;
  isOpened!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isMobile = (window.innerWidth < 376);
    this.isOpened = false;
  }

  toggleNavMenu(): void {
    const hamburgerMenu = document.getElementById('nav-menu');
    hamburgerMenu?.classList.toggle("opened");

    if (hamburgerMenu?.classList.contains("opened")) {
      this.isOpened = true;
    }
    else this.isOpened = false;
    console.log(this.isOpened);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

    if (window.innerWidth < 376) {
      this.isMobile = true;
    }
    else this.isMobile = false;
  }

}
