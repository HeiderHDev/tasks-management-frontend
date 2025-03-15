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

  public readonly taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    status: new FormControl('pendiente', [
      Validators.required,
      Validators.pattern(/^(pendiente|completado)$/),
    ]),
  });

  public sendForm(): void {}

  public closeForm(realod?: boolean): void {
    this.dialogRef.close(realod);
  }
}
