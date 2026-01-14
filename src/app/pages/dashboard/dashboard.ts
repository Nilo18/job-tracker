import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { JobApplicationAddModal } from '../../components/job-application-add-modal/job-application-add-modal';
import { JobApplication, JobService } from '../../services/job-service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  data: any = {}
  showLoggedInHeader: boolean = false
  showModal: boolean = false
  jobs$!: Observable<JobApplication[]>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal, 
  public jobsService: JobService) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // console.log(window.location.hash)
      const hash = window.location.hash.substring(1) // Remove #
      const url = new URLSearchParams(hash)
      // console.log("access_token: ", url.get("access_token"))
      // console.log("ID token: ", url.get("id_token"))
      const idToken = url.get("id_token") || ''
      const data = jwtDecode(idToken)
      this.data = data
      this.showLoggedInHeader = true
      console.log("showLoggedInHeader is: ", this.showLoggedInHeader)
      // console.log(data)
      // console.log(this.data)
    }
    
    this.jobsService.getJobApplications()
    this.jobs$ = this.jobsService.jobsObs$.pipe(
      tap(jobs => console.log(`The jobs are: `, jobs)),
      map(jobs =>
        jobs.map((job: JobApplication) => ({
          ...job,
          date_sent: new Date(job.date_sent).toLocaleDateString()
        }))
      )
    );
  }

  showAddModal(event: MouseEvent) {
    // console.log(event);
    // return
    (event.target as HTMLElement).blur()

    this.modalService.open(JobApplicationAddModal, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    })
  }

  deleteJobApp(id: string | undefined) {
    console.log("I run")
    this.jobsService.deleteJobApplication(id)
  }
}
