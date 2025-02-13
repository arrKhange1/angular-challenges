import { inject, Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { Todo } from '../model/todo.model';
import { TodoDataService } from '../store/todo.data.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoDataService = inject(TodoDataService);
  private todoApiService = inject(TodoApiService);

  public updateTodo$ = this.todoDataService.update$.pipe(
    exhaustMap((todo) => this.todoApiService.updateTodos(todo)),
    tap((updatedTodo) => this.todoDataService.updateTodos(updatedTodo)),
  );

  public deleteTodo$ = this.todoDataService.delete$.pipe(
    exhaustMap((id) => this.todoApiService.deleteTodo(id)),
    tap((id) => this.todoDataService.deleteTodo(id)),
  );

  public initTodos(): Observable<Todo[]> {
    return this.todoApiService
      .getTodos()
      .pipe(tap((todos) => this.todoDataService.setTodos(todos)));
  }
}
