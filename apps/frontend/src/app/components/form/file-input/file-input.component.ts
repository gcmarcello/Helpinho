import { CommonModule } from "@angular/common";
import { Component, HostListener, Input, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

type FileType =
  | "PNG"
  | "JPEG"
  | "JPG"
  | "GIF"
  | "SVG"
  | "WEBP"
  | "PDF"
  | "DOCX"
  | "XLSX"
  | "DOC"
  | "XLS";

const fileTypes = {
  PNG: "image/png",
  JPEG: "image/jpeg",
  JPG: "image/jpg",
  GIF: "image/gif",
  SVG: "image/svg",
  WEBP: "image/webp",
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  DOC: "application/msword",
  XLS: "application/vnd.ms-excel",
};

@Component({
  selector: "app-file-input",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./file-input.component.html",
})
export class FileInputComponent implements OnInit {
  @Input() formGroup!: ClassValidatorFormGroup;
  @Input() name: string = "";
  @Input() label?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() accept: FileType[];
  @Input() maxSize?: number = 1000; // In kbytes

  currentFile?: File;
  blob?: string;
  base64Data?: string;
  allowedTypes?: string;
  allowedMimeTypes?: string[];

  ngOnInit(): void {
    this.allowedTypes = this.accept?.join(", ");
    this.allowedMimeTypes = this.accept?.map((type) => fileTypes[type]);
  }

  @HostListener("window:dragover", ["$event"])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = (event as DragEvent).dataTransfer?.files[0];
    if (
      (file && !this.allowedMimeTypes?.includes(file.type as FileType)) ||
      (this.maxSize && file!.size > this.maxSize * 1000)
    ) {
      return;
    }

    if (file) {
      return this.handleFileChange(file);
    }
  }

  handleSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (
      (file && !this.allowedMimeTypes?.includes(file.type as FileType)) ||
      (this.maxSize && file!.size > this.maxSize * 1000)
    ) {
      return;
    }

    if (file) {
      return this.handleFileChange(file);
    }
  }

  handleFileChange(file: File) {
    this.formGroup.get(this.name)?.setValue(file);
    this.readFile(file);
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Data = reader.result as string;
    };
    return reader.readAsDataURL(file); // Use readAsDataURL to get the Base64 data
  }
}
