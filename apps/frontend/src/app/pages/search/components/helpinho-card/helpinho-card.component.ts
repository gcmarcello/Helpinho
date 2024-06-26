import { Component, Input, OnInit } from "@angular/core";
import { Helpinho, User } from "shared-types";

@Component({
  selector: "app-helpinho-card",
  standalone: true,
  imports: [],
  templateUrl: "./helpinho-card.component.html",
})
export class HelpinhoCardComponent implements OnInit {
  constructor() {}
  @Input() helpinho: Helpinho;
  user: User;

  ngOnInit(): void {
    if (this.helpinho.user) this.user = this.helpinho.user;
  }
}
