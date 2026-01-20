import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobApplication } from '../../services/job-service';

interface JobApplicationStats {
  total: number,
  accepted: number, 
  rejected: number,
  pending: number
}

@Component({
  selector: 'app-dashboard-stats',
  standalone: false,
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.scss',
})
export class DashboardStats {
  @Input({required: true}) jobs$!: Observable<JobApplication[]>
  stats$!: Observable<JobApplicationStats>

  ngOnInit() {
    this.stats$ = this.jobs$.pipe(
      map(jobs =>
        jobs.reduce((acc: any, job) => {
          acc.total++
          acc[job.status.toLowerCase()]++
          return acc
        }, { total: 0, accepted: 0, rejected: 0, pending: 0 })
      )
    )
  }
}
