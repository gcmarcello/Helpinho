import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

type Color =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

type Variant = "base" | "light" | "white";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
  imports: [CommonModule, RouterModule],
})
export class ButtonComponent {
  @Input() type: "button" | "submit" = "button";
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() color: Color = "primary";
  @Input() variant: Variant = "base";
  @Input() href?: string;
  @Input() target?: "_blank" | "_self" | "_parent" | "_top" = "_self";
  @Input() class: string = "";

  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.href) {
      this.buttonClick.emit();
    }
  }

  getCombinedClasses() {
    const defaultClasses = this.buttonStyles[this.color][this.variant];
    const additionalClasses = this.class;
    const classArr = [defaultClasses, additionalClasses, this.generalStyle];
    return classArr.join(" ");
  }

  generalStyle =
    "duration-200 text-lg lg:text-base py-[8px] px-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-25";

  buttonStyles: { [key in Color]: { [key in Variant]: string } } = {
    primary: {
      base: "bg-primary-500 text-white hover:bg-primary-700",
      light:
        "bg-primary-100 text-primary-500 hover:bg-white hover:text-primary-500",
      white: "bg-white text-primary-500 hover:bg-primary-500 hover:text-white",
    },
    secondary: {
      base: "bg-secondary-500 text-white hover:bg-secondary-700",
      light:
        "bg-secondary-100 text-secondary-500 hover:bg-white hover:text-secondary-500",
      white:
        "bg-white text-secondary-500 hover:bg-secondary-500 hover:text-white",
    },
    success: {
      base: "bg-success-500 text-white hover:bg-success-700",
      light: "bg-success-100 text-success-500 hover:bg-white",
      white: "bg-white text-success-500 hover:bg-success-500 hover:text-white",
    },
    warning: {
      base: "bg-warning-500 text-white hover:bg-warning-700",
      light:
        "bg-warning-100 text-warning-500 hover:bg-white hover:text-warning-500",

      white: "bg-white text-warning-500 hover:bg-warning-500 hover:text-white",
    },
    error: {
      base: "bg-error-500 text-white hover:bg-error-700",
      light: "bg-error-100 text-error-500 hover:bg-white hover:text-error-500",

      white: "bg-white text-error-500 hover:bg-error-500 hover:text-white",
    },
    neutral: {
      base: "bg-neutral-500 text-white hover:bg-neutral-700",
      light:
        "bg-white text-neutral-500 hover:bg-neutral-200 border border-neutral-200 hover:text-neutral-500",

      white: "bg-white text-neutral-500 hover:bg-neutral-500 hover:text-white",
    },
  };
}
