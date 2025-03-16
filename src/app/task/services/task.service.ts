import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createQueryParams } from '@core/functions/create-query-params';
import { PaginationDto } from '@core/models/pagination-dto.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CreateTask } from '../interfaces/create-task.interface';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public getListTask(
    pagination: PaginationDto
  ): Observable<HttpResponse<Task[]>> {
    let queryParams = createQueryParams(pagination);
    return this.http.get<Task[]>(`${this.apiUrl}/api/TaskItems`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public createTask(body: CreateTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/TaskItems`, body);
  }
}
