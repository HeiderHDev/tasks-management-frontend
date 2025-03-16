import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PaginationDto } from '@core/models/pagination-dto.interface';
import { ToastService } from '@core/services/toast.service';

import { Task } from '@task/interfaces/task.interface';
import { TaskService } from '@task/services/task.service';

const materialModules = [
  MatPaginator,
  MatSort,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatTooltipModule,
];

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [...materialModules, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, AfterViewInit {
  public tasks = signal<Task[]>([]);
  public totalRecords = signal<number>(0);

  public pagination: PaginationDto = { Page: 1, RecordsPerPage: 5 };

  public dataSource = new MatTableDataSource<Task>([]);
  public displayedColumns: string[] = [
    'actions',
    'title',
    'description',
    'isComplete',
  ];

  private readonly _taskService = inject(TaskService);
  private readonly _toasService = inject(ToastService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadTasks();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public updatePagination(event: PageEvent): void {
    this.pagination = {
      Page: event.pageIndex + 1,
      RecordsPerPage: event.pageSize,
    };
    this.loadTasks();
  }

  private loadTasks(): void {
    this._taskService.getListTask(this.pagination).subscribe({
      next: (response) => {
        const taskData = response.body as Task[];
        const cabecera = response.headers.get(
          'cantidad-total-registros'
        ) as string;
        this.tasks.set(taskData);

        this.totalRecords.set(parseInt(cabecera, 10));

        this.dataSource.data = taskData;
      },
      error: () => {
        this._toasService.error('Error', 'Hubo un error al cargar las tareas');
      },
    });
  }

  public changeStatus(task: Task): void {}
}
