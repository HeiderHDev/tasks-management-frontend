import { Routes } from '@angular/router';
import { TaskComponent } from '@task/task.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: 'tareas', component: TaskComponent },
      { path: '**', redirectTo: 'tareas' },
    ],
  },
];
