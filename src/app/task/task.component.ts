import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

const materialModules = [MatButtonModule];

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

  public openTaskFormModal() {}
}
