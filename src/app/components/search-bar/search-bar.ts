import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JobService } from '../../services/job-service';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  public jobService: JobService = inject(JobService)
  public results$!: Observable<any>
  queryControl = new FormControl('')

  ngOnInit() {
    this.results$ = this.queryControl.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      filter(val => !!val && val.trim() !== ''),
      switchMap(val => {
        return this.jobService.search(String(val))
      }),
    )
  }

  get queryVal() {
    return this.queryControl.value
  }
}
