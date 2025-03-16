import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const materialModules = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ...materialModules, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class TaskComponent implements OnInit {
  public date = new Date();

  private readonly _matDialog = inject(MatDialog);

  public ngOnInit(): void {}

  public openTaskFormModal() {
    this._matDialog.open(TaskFormComponent, {
      disableClose: true,
    });
  }
}
