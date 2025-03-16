import { inject, Injectable, signal } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '@task/interfaces/task.interface';
import { PaginationDto } from '@core/models/pagination-dto.interface';
import { finalize } from 'rxjs';
import { CreateTask } from '@task/interfaces/create-task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private readonly _taskService = inject(TaskService);

  public tasks = signal<Task[]>([]);
  public totalRecords = signal<number>(0);
  public currentPagination = signal<PaginationDto>({
    Page: 1,
    RecordsPerPage: 5,
  });

  constructor() {}

  public loadTasks(pagination?: PaginationDto): void {
    if (pagination) {
      this.currentPagination.set(pagination);
    }
    this._taskService.getListTask(this.currentPagination()).subscribe({
      next: (response) => {
        const taskData = response.body as Task[];
        const cabecera = response.headers.get(
          'cantidad-total-registros'
        ) as string;
        this.tasks.set(taskData);
        this.totalRecords.set(parseInt(cabecera, 10));
      },
    });
  }

  public createTask(taskData: CreateTask) {
    return this._taskService.createTask(taskData);
  }

  public refreshTasks(): void {
    this.loadTasks();
  }
}
