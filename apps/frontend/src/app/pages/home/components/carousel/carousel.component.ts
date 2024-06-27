import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-carousel",
  standalone: true,
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {
  @Input() items: string[];

  ngOnInit(): void {
    this.duplicateItems();
  }

  duplicateItems() {
    this.items = [...this.items, ...this.items];
  }
}
