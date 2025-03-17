import { inject, Injectable, signal } from '@angular/core';
import { PaginationDto } from '@core/models/pagination-dto.interface';
import { CreateTask } from '@task/interfaces/create-task.interface';
import { Task } from '@task/interfaces/task.interface';
import { UpdateTaskStatus } from '@task/interfaces/update-task-status.interface';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private readonly _taskService = inject(TaskService);

  public tasks = signal<Task[]>([]);
  public totalRecords = signal<number>(0);
  public currentFilter = signal<boolean | undefined>(undefined);
  public currentPagination = signal<PaginationDto>({
    Page: 1,
    RecordsPerPage: 5,
  });

  constructor() {}

  public loadTasks(pagination?: PaginationDto, isComplete?: boolean): void {
    if (pagination) {
      this.currentPagination.set(pagination);
    }
    if (isComplete !== undefined) {
      this.currentFilter.set(isComplete);
    }
    this._taskService
      .getListTask(this.currentPagination(), this.currentFilter())
      .subscribe({
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

  public updatedTask(id: number, isComplete: boolean) {
    const updateStatus: UpdateTaskStatus = {
      isComplete: isComplete,
    };
    return this._taskService.updatedStatus(id, updateStatus);
  }

  public deletedTask(id: number) {
    return this._taskService.deleteTask(id);
  }

  public refreshTasks(): void {
    this.loadTasks(undefined, this.currentFilter());
  }

  public setFilter(isComplete?: boolean): void {
    const pagination = {
      ...this.currentPagination(),
      Page: 1,
    };
    this.currentFilter.set(isComplete);
    this.loadTasks(pagination, isComplete);
  }

  public clearFilter(): void {
    this.currentFilter.set(undefined);

    const pagination = {
      ...this.currentPagination(),
      Page: 1,
    };

    // Cargar tareas sin el parámetro isComplete
    this._taskService.getListTask(pagination).subscribe({
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
}
