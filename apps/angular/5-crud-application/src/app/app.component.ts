import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../service/todo.service';
import { TodoDataService } from '../store/todo.data.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  protected todoDataService = inject(TodoDataService);
  protected todos = this.todoDataService.todos;

  public ngOnInit(): void {
    this.todoService.initTodos().subscribe();
    this.todoService.updateTodo$.subscribe();
    this.todoService.deleteTodo$.subscribe();
  }

  protected update(todo: Todo): void {
    this.todoDataService.update$.next(todo);
  }

  protected delete(id: Todo['id']): void {
    this.todoDataService.delete$.next(id);
  }
}
