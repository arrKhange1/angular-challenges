import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TodoApiService } from '../api/todo.api.service';
import { Todo } from '../model/todo.model';
import { TodoDataService } from '../store/todo.data.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoApiService = inject(TodoApiService);
  private todoDataService = inject(TodoDataService);
  protected todos = this.todoDataService.todos;

  public ngOnInit(): void {
    this.todoApiService.getTodos().subscribe((todos) => {
      this.todoDataService.setTodos(todos);
    });
  }

  protected update(todo: Todo): void {
    this.todoApiService.updateTodos(todo).subscribe((todoUpdated) => {
      this.todoDataService.updateTodos(todoUpdated);
    });
  }
}
