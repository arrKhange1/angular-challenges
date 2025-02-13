import { Directive, input } from '@angular/core';

interface ListTemplateContext<TItem> {
  $implicit: TItem;
  appList: TItem;
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
})
export class ListDirective<TItem> {
  public appList = input<TItem[]>([]);

  static ngTemplateContextGuard<TItem>(
    directive: ListDirective<TItem>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TItem> {
    return true;
  }
}
