import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private _todos = signal<Todo[]>([]);
  public todos = this._todos.asReadonly();

  public setTodos(todos: Todo[]): void {
    this._todos.set(todos);
  }

  public updateTodos(updatedTodo: Todo): void {
    this._todos.update((todos) =>
      todos.map((currTodo) =>
        currTodo.id === updatedTodo.id ? updatedTodo : currTodo,
      ),
    );
  }
}
