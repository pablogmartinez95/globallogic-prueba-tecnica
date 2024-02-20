import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appBrokenImage]'
})
export class BrokenImageDirective {
  constructor(private el: ElementRef) { }

  @HostListener("error")
  private onError() {
    this.el.nativeElement.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png";
  }
}
