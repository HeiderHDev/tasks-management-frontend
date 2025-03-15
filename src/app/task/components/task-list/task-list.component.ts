import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

interface Task {
  created_at: Date;
  title: string;
  description: string;
  status: string;
}

const materialModules = [
  MatPaginator,
  MatSort,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
];

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [...materialModules, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, AfterViewInit {
  public tasks: Task[] = [
    {
      created_at: new Date(),
      title: 'Tarea 1',
      description: 'Descripción 1',
      status: 'pendiente',
    },
    {
      created_at: new Date(),
      title: 'Tarea 2',
      description: 'Descripción 2',
      status: 'completado',
    },
  ];
  public displayedColumns: string[] = [
    'created_at',
    'title',
    'description',
    'status',
    'actions',
  ];
  public dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public changeStatus(task: Task): void {
    task.status = task.status === 'pendiente' ? 'completado' : 'pendiente';
    this.dataSource.data = [...this.tasks]; // Refresh the table
  }
}
