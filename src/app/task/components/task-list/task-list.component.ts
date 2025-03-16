import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  inject,
  input,
  effect,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '@task/interfaces/task.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  public tasks = input.required<Task[]>();
  public displayedColumns: string[] = [
    'createdAt',
    'title',
    'description',
    'isComplete',
    'actions',
  ];
  public dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      if (this.dataSource) {
        this.dataSource.data = this.tasks();
      }
    });
  }

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks());
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changeStatus(task: Task): void {
    task.isComplete = !task.isComplete;
    this.dataSource.data = [...this.dataSource.data];
  }
}
