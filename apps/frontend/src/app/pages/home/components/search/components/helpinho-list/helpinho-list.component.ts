import { Component, Inject, OnInit, signal } from "@angular/core";
import { HelpinhoService } from "../../../../../../services/helpinho.service";
import { HelpinhoCardComponent } from "../helpinho-card/helpinho-card.component";
import { CommonModule, DOCUMENT } from "@angular/common";
import { SearchboxComponent } from "../../../../../../components/form/searchbox/searchbox.component";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { ReactiveFormsModule } from "@angular/forms";
import { GetHelpinhoDto, Helpinho, LoginDto } from "shared-types";
import { SelectComponent } from "../../../../../../components/form/select/select.component";
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  Observable,
  switchMap,
  takeWhile,
  tap,
} from "rxjs";
import { SpinnerComponent } from "../../../../../../components/loading/components/spinner.component";

@Component({
  selector: "app-helpinho-list",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SearchboxComponent,
    HelpinhoCardComponent,
    CommonModule,
    ClassValidatorFormBuilderModule,
    SelectComponent,
    SpinnerComponent,
  ],
  templateUrl: "./helpinho-list.component.html",
})
export class HelpinhoListComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: ClassValidatorFormBuilderService,
    private helpinhoService: HelpinhoService
  ) {}

  searchForm = this.fb.group(
    LoginDto,
    {
      title: [""],
      category: [""],
    },
    { updateOn: "change" }
  );

  helpinhos: Helpinho[] | null = null;

  isHelpinhoLoading = false;

  isInfiniteScrollLoading = false;

  exhaustedHelpinhos = false;

  categories = [
    { value: "games", label: "Jogos" },
    { value: "health", label: "Saúde" },
    { value: "music", label: "Música" },
    { value: "fix", label: "Reforma" },
    { value: "emergency", label: "Emergência" },
    { value: "hospital", label: "Hospitalar" },
  ];

  ngOnInit() {
    this.resetHelpinhos();

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((data) => {
          this.isHelpinhoLoading = true;
          return this.fetchHelpinhos(data as GetHelpinhoDto);
        })
      )
      .subscribe((data: Helpinho[]) => {
        setTimeout(() => {
          this.isHelpinhoLoading = false;
          this.helpinhos = data;
        }, 750);
      });

    fromEvent(this.document, "scroll")
      .pipe(
        filter(() => !this.exhaustedHelpinhos),
        debounceTime(100),
        map(() => {
          return this.getScrollInfo();
        })
      )
      .subscribe(({ scrollPosition, scrollThreshold }) => {
        const helpinhos = this.helpinhos;

        if (!helpinhos?.length) return;

        if (scrollPosition >= scrollThreshold) {
          this.isInfiniteScrollLoading = true;

          this.fetchHelpinhos({
            ...this.searchForm.value,
            cursor: this.helpinhos?.[this.helpinhos.length - 1]?.id,
          }).subscribe((data: Helpinho[]) => {
            if (data.length) {
              this.helpinhos = [...helpinhos, ...data];
            }
            this.isInfiniteScrollLoading = false;
          });
        }
      });
  }

  fetchHelpinhos(params?: GetHelpinhoDto): Observable<Helpinho[]> {
    return this.helpinhoService.list(params).pipe(
      tap((data: Helpinho[]) => {
        this.exhaustedHelpinhos = !data.length;
      })
    );
  }

  resetHelpinhos() {
    this.fetchHelpinhos().subscribe((data: Helpinho[]) => {
      this.helpinhos = data;
    });
  }

  getScrollInfo() {
    const scrollTop =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    const scrollHeight =
      this.document.documentElement.scrollHeight ||
      this.document.body.scrollHeight;
    const clientHeight = this.document.documentElement.clientHeight;
    const scrollPosition = scrollTop + clientHeight;
    const scrollThreshold = scrollHeight * 0.88;

    return { scrollPosition, scrollThreshold };
  }
}
