import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

type Link = {
  name: string;
  url?: string;
  nav?: string;
};

@Component({
  selector: "app-navigation-links",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navigation-links.component.html",
})
export class NavigationLinksComponent {
  constructor(private router: Router) {}
  links: Link[] = [
    { name: "Home", url: "/" },
    { name: "Pesquisa", nav: "pesquisa" },
    { name: "Helpinhos", url: "/helpinhos" },
  ];
  activeLink: Link =
    this.links.find((link) => link.url === this.router.url) ?? this.links[0];
}
