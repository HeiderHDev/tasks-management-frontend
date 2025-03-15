import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from './components/task-form/task-form.component';

const materialModules = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class TaskComponent {
  public date = new Date();
  private matDialog = inject(MatDialog);

  public openTaskFormModal() {
    const dialogRef = this.matDialog.open(TaskFormComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) this.getAllTasks();
    });
  }

  private getAllTasks() {}
}
