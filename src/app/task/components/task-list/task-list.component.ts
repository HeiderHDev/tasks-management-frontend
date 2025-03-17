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
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastService } from '@core/services/toast.service';

import { Task } from '@task/interfaces/task.interface';
import { DeleteTaskComponent } from '@task/modal/delete-task/delete-task.component';
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
  private readonly _dialog = inject(MatDialog);
  private readonly _toastService = inject(ToastService);

  public dataSource = new MatTableDataSource<Task>([]);
  public displayedColumns: string[] = [
    'estado',
    'title',
    'description',
    'isComplete',
    'eliminar',
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

  public changeStatus(task: Task): void {
    const newStatus = !task.isComplete;

    this._taskStore.updatedTask(task.id, newStatus).subscribe({
      next: () => {
        this._taskStore.refreshTasks();
        this._toastService.success(
          'Bien hecho',
          'Actualizaste correctamente el estado de tu tarea'
        );
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this._toastService.error(
          'Error',
          'Ocurrió un error al actualizar la tarea'
        );
      },
    });
  }

  public confirmDeleteTask(task: Task): void {
    const dialogRef = this._dialog.open(DeleteTaskComponent, {
      width: '400px',
      data: {
        title: '¿Eliminar tarea?',
        message: `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask(task.id);
      }
    });
  }

  private deleteTask(taskId: number) {
    this._taskStore.deletedTask(taskId).subscribe({
      next: () => {
        this._taskStore.refreshTasks();

        this._toastService.success(
          'Tarea eliminada',
          'La tarea ha sido eliminada correctamente'
        );
      },
      error: (error) => {
        this._toastService.error('Error', 'No se pudo eliminar la tarea');
      },
    });
  }

  get totalRecords() {
    return this._taskStore.totalRecords;
  }

  get pagination() {
    return this._taskStore.currentPagination;
  }
}
