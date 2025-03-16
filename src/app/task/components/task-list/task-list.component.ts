import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
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

import { Task } from '@task/interfaces/task.interface';
import { TaskStoreService } from '@task/services/task-store.service';

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
  private readonly _taskStore = inject(TaskStoreService);

  public dataSource = new MatTableDataSource<Task>([]);
  public displayedColumns: string[] = [
    'actions',
    'title',
    'description',
    'isComplete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this._taskStore.tasks();
    });
  }

  ngOnInit(): void {
    this._taskStore.loadTasks();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public updatePagination(event: PageEvent): void {
    this._taskStore.loadTasks({
      Page: event.pageIndex + 1,
      RecordsPerPage: event.pageSize,
    });
  }

  public changeStatus(task: Task): void {}

  get totalRecords() {
    return this._taskStore.totalRecords;
  }

  get pagination() {
    return this._taskStore.currentPagination;
  }
}
