import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogData } from '@task/interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <h2 class="confirm-dialog__title" mat-dialog-title>{{ data.title }}</h2>

      <div mat-dialog-content class="confirm-dialog__content">
        <p class="confirm-dialog__message">{{ data.message }}</p>
      </div>

      <div mat-dialog-actions class="confirm-dialog__actions">
        <button
          mat-button
          [mat-dialog-close]="false"
          class="confirm-dialog__button confirm-dialog__button--cancel"
        >
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button
          mat-flat-button
          color="warn"
          [mat-dialog-close]="true"
          class="confirm-dialog__button confirm-dialog__button--confirm"
        >
          <mat-icon class="confirm-dialog__icon">delete</mat-icon>
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </div>
    </div>
  `,
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}
