import { Directive } from '@angular/core';

interface PersonTemplateContext {
  $implicit: string;
  name: string;
  age: number;
}

@Directive({
  selector: 'ng-template[appPerson]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    directive: PersonDirective,
    ctx: unknown,
  ): ctx is PersonTemplateContext {
    return true;
  }
}
