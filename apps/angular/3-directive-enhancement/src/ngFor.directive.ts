import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  inject,
  input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
  ],
})
export class NgForDirective<T> implements OnChanges {
  public ngForOf = input<T[] | null>();
  public ngForEmpty = input<TemplateRef<any>>();
  private vcr = inject(ViewContainerRef);
  private embeddedEmptyTemplate?: EmbeddedViewRef<any>;

  public ngOnChanges(): void {
    this.embeddedEmptyTemplate?.destroy();
    const emptyTemplate = this.ngForEmpty();
    if ((!this.ngForOf() || this.ngForOf()?.length === 0) && emptyTemplate) {
      this.embeddedEmptyTemplate = this.vcr.createEmbeddedView(emptyTemplate);
    }
  }
}
