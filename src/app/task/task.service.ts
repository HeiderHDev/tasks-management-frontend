import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Task } from './interfaces/task.interface';
import { CreateTask } from './interfaces/create-task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getListTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/TaskItems`);
  }

  createTask(body: CreateTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/TaskItems`, body);
  }
}
