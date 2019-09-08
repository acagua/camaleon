import { Component, ElementRef, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor
{
  @Input() progress;
  onChange: Function;
  private file: File | null = null;
  imageURL: any;
  public message: string;

  @Output()
  imageUpdate = new EventEmitter<string>();

  onImageUpdate()
  {
    this.imageUpdate.emit("hola");
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList)
  {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>)
  {
  }


  writeValue(value: null)
  {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function)
  {
    this.onChange = fn;
  }


  registerOnTouched(fn: Function)
  {
  }


  preview(files)
  {
    if (files.length === 0)
    {
      return;
    }

    var mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null)
    {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) =>
    {
      this.imageURL = reader.result;
      this.onImageUpdate();
    }
  }

}