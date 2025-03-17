import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createQueryParams } from '@core/functions/create-query-params';
import { PaginationDto } from '@core/models/pagination-dto.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CreateTask } from '../interfaces/create-task.interface';
import { Task } from '../interfaces/task.interface';
import { UpdateTaskStatus } from '@task/interfaces/update-task-status.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public getListTask(
    pagination: PaginationDto,
    isComplete?: boolean
  ): Observable<HttpResponse<Task[]>> {
    let queryParams = createQueryParams(pagination);
    if (isComplete !== undefined) {
      queryParams = queryParams.set('isComplete', isComplete.toString());
    }
    return this.http.get<Task[]>(`${this.apiUrl}/api/TaskItems`, {
      params: queryParams,
      observe: 'response',
    });
  }

  public createTask(body: CreateTask): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/TaskItems`, body);
  }

  public deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/api/TaskItems/${id}`);
  }

  public updatedStatus(id: number, body: UpdateTaskStatus) {
    return this.http.patch(`${this.apiUrl}/api/TaskItems/${id}/status`, body);
  }
}
