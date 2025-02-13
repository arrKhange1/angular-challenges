import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { map, Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  public updateTodos(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  public deleteTodo(todoId: Todo['id']): Observable<Todo['id']> {
    return this.http
      .delete<void>(`${this.baseUrl}/${todoId}`)
      .pipe(map(() => todoId));
  }
}
