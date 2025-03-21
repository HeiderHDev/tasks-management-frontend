import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ToastService } from '@core/services/toast.service';

import { FORM_ERRORS, FormErrorsMessages } from '@task/constants/form-errors';
import { CreateTask } from '@task/interfaces/create-task.interface';
import { TaskStoreService } from '@task/services/task-store.service';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
];

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ...materialModules],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private readonly _dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private readonly _taskStore = inject(TaskStoreService);
  private readonly _toastService = inject(ToastService);
  private readonly _errorMessages: FormErrorsMessages = inject(FORM_ERRORS);

  public readonly taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
    isComplete: new FormControl<string>('pendiente', [Validators.required]),
  });

  public sendForm(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    const createTask: CreateTask = {
      title: formValue.title!,
      description: formValue.description!,
      isComplete: formValue.isComplete === 'completado',
    };

    this._taskStore.createTask(createTask).subscribe({
      next: () => {
        this._taskStore.refreshTasks();
        this.closeForm();
        this._toastService.success('Bien hecho', 'Tarea creada correctamente');
      },
      error: () => {
        this._toastService.error('Error', 'Ocurrió un error al crear la tarea');
      },
    });
  }

  public closeForm(reload?: boolean): void {
    this._dialogRef.close(reload);
  }

  public getMessageError(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (!control || !control.errors) return '';
    const [firstError] = Object.keys(control.errors);
    const errorKey = firstError as keyof FormErrorsMessages;
    return this._errorMessages[errorKey]?.(control.errors[firstError]) ?? '';
  }
}
