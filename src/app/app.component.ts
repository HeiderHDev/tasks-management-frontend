import { NgxToastModule } from '@angular-magic/ngx-toast';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { LoadingService } from '@core/services/loading.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, NgxToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'task-management-frontend';
  public loading = false;
  private readonly _loadingService = inject(LoadingService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.listenToLoading();
  }

  private listenToLoading(): void {
    this._loadingService
      .isLoading()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.loading = loading;
        this.cdr.detectChanges();
      });
  }
}
