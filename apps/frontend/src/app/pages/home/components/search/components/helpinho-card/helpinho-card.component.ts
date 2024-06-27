import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Help, Helpinho, User } from "shared-types";
import { categories } from "../../../../../../constants/categories";

@Component({
  selector: "app-helpinho-card",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./helpinho-card.component.html",
})
export class HelpinhoCardComponent implements OnInit {
  constructor() {}
  @Input() helpinho: Helpinho;
  user: User;

  helperIds: string[];

  generateCategoryBadge(category: string) {
    return categories.find((cat) => cat.id === category)!.name;
  }

  ngOnInit(): void {
    if (this.helpinho.helps) {
      const uniqueHelperIds = this.helpinho.helps.reduce((acc, help) => {
        if (!acc.includes(help.userId)) {
          acc.push(help.userId);
        }
        return acc;
      }, [] as any[]);

      this.helperIds = uniqueHelperIds;
    }
    if (this.helpinho.user) this.user = this.helpinho.user;
  }
}
