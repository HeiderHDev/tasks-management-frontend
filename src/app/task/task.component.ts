import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './task.service';
import { Task } from './interfaces/task.interface';

const materialModules = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ...materialModules, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [provideNativeDateAdapter(), TaskService],
})
export class TaskComponent implements OnInit {
  public date = new Date();
  public tasks = signal<Task[]>([]);
  private matDialog = inject(MatDialog);
  private taskService = inject(TaskService);

  public ngOnInit(): void {
    this.getAllTasks();
  }

  public openTaskFormModal() {
    const dialogRef = this.matDialog.open(TaskFormComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) this.getAllTasks();
    });
  }

  private getAllTasks(): void {
    this.taskService.getListTask().subscribe({
      next: (tasks) => {
        console.log(tasks);
        this.tasks.set(tasks);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
