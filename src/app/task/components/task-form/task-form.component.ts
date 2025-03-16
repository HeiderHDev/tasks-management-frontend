import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '@task/task.service';
import { CreateTask } from '@task/interfaces/create-task.interface';
import { ToastService } from '@core/services/toast.service';

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
  imports: [ReactiveFormsModule, ...materialModules],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private readonly taskService = inject(TaskService);
  private _toastService = inject(ToastService);

  public readonly taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    isComplete: new FormControl<string>('pendiente', [Validators.required]),
  });

  public sendForm(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;
    const createTask: CreateTask = {
      title: formValue.title!,
      description: formValue.description!,
      isComplete: formValue.isComplete === 'completado',
    };

    this.taskService.createTask(createTask).subscribe({
      next: () => {
        this.closeForm(true);
        this._toastService.success('Bien hecho', 'Tarea creada correctamente');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public closeForm(reload?: boolean): void {
    this.dialogRef.close(reload);
  }
}
