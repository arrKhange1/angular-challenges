import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForDirective } from '../ngFor.directive';

interface Person {
  name: string;
}

@Component({
  imports: [NgForDirective],
  selector: 'app-root',
  template: `
    <!--    <ng-template-->
    <!--      ngFor-->
    <!--      let-person-->
    <!--      [ngForOf]="persons()"-->
    <!--      [ngForEmpty]="empty">-->
    <!--      <div>{{ person.name }}</div>-->
    <!--    </ng-template>-->

    <div
      *ngFor="let person; let idx = index; of: persons(); empty: emptyTemplate">
      {{ person.name }} {{ idx }}
    </div>

    <ng-template #emptyTemplate>This list is empty !!</ng-template>

    <button (click)="persons.set([])">Clear</button>
    <button (click)="addPerson()">Add</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = signal<Person[]>([
    { name: 'Arthur' },
    { name: 'British' },
    { name: 'German' },
  ]);

  addPerson() {
    this.persons.update((persons) => [...persons, { name: 'Giga chad' }]);
  }
}
