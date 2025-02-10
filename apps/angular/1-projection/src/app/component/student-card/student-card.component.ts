import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #studentListItem let-item>
      <app-list-item (deleteItem)="deleteStudent(item.id)">
        {{ item.firstName }}
      </app-list-item>
    </ng-template>
    <app-card
      [listItemTemplate]="studentListItem"
      (addItem)="addStudent()"
      [list]="students()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  protected addStudent(): void {
    this.store.addOne(randStudent());
  }

  protected deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
