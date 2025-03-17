import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskStoreService } from './services/task-store.service';

const materialModules = [MatButtonModule, MatIconModule, MatButtonToggleModule];

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
  private readonly _taskStore = inject(TaskStoreService);

  public currentFilter = computed(() => this._taskStore.currentFilter());

  public ngOnInit(): void {}

  public openTaskFormModal() {
    this._matDialog.open(TaskFormComponent, {
      disableClose: true,
    });
  }
  public filterCompleted() {
    this._taskStore.setFilter(true);
  }

  public filterPending() {
    this._taskStore.setFilter(false);
  }

  public clearFilter() {
    this._taskStore.clearFilter();
  }
}
