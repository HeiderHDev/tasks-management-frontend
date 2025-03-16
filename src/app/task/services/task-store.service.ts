import { inject, Injectable, signal } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '@task/interfaces/task.interface';
import { PaginationDto } from '@core/models/pagination-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private readonly _taskService = inject(TaskService);

  public task = signal<Task[]>([]);
  public totalRecords = signal<number>(0);
  public currentPagination = signal<PaginationDto>({
    Page: 1,
    RecordsPerPage: 5,
  });

  constructor() {}
}
