import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template #teacherListItem let-item>
      <app-list-item (deleteItem)="deleteTeacher(item.id)">
        {{ item.firstName }}
      </app-list-item>
    </ng-template>
    <app-card
      [listItemTemplate]="teacherListItem"
      (addItem)="addTeacher()"
      [list]="teachers()">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  protected addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  protected deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
