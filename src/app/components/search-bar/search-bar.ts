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
      tap(() => console.log("Sending request...")),
      debounceTime(150),
      distinctUntilChanged(),
      filter(val => !!val && val.trim() !== ''),
      switchMap(val => {
        console.log(val)
        return this.jobService.search(String(val))
      }),
      tap(() => console.log("Received response.")),
    )
    // this.results$.subscribe({
    //   next: (value) => {
    //     // Here, 'value' is the actual data
    //     console.log('Observable value:', value);
    //   },
    //   error: (err) => console.error('An error occurred:', err),
    //   complete: () => console.log('Observable completed'),
    // });
  }

  get queryVal() {
    return this.queryControl.value
  }
}
