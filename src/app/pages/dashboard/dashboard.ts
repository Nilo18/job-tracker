import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { JobApplicationAddModal } from '../../components/job-application-add-modal/job-application-add-modal';
import { ApplicationUpdateProperties, JobApplication, JobService } from '../../services/job-service';
import { GoogleAuthServerResponse } from '../../services/google-api-service';
import { debounceTime, firstValueFrom, map, Observable, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

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
  baseURL: string = "http://localhost:3000"
  searchBar = new FormControl()
  statusSelect = new FormControl('all', {nonNullable: true})
  searchVal: string = ''
  statusVal: string = ''
  // pageLoading: boolean = true

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal, 
  public jobsService: JobService, public oAuthService: OAuthService, private http: HttpClient, 
  private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jobF_token')
      window.history.replaceState({}, document.title, window.location.pathname);
      if (token) {
        console.log("Cleared URL input")
        const data = jwtDecode(token)
        this.data = data
        this.showLoggedInHeader = true
        console.log("Decoded token is: ", this.data)
      }
      // console.log('a')
      this.searchBar.valueChanges.pipe(
        tap(() => {
          console.log("Search bar value is: ", this.searchBar.value)
        }),
        debounceTime(300),
      ).subscribe(val => {
        this.searchVal = val
        this.jobsService.getJobApplications(this.data._id, this.searchVal, this.statusVal)
      })

      this.statusSelect.valueChanges.pipe(
        tap(() => {
          console.log("Status select value is: ", this.statusSelect.value)
        })
      ).subscribe(val => {
        this.statusVal = val;
        this.jobsService.getJobApplications(this.data._id, this.searchVal, this.statusVal)
      })
  }
    
    console.log("_id is: ", this.data._id)
    this.jobsService.getJobApplications(this.data._id)
    console.log("jobs observable in the service: ", this.jobsService.jobsObs$)
    this.jobs$ = this.jobsService.jobsObs$.pipe(
      tap(jobs => console.log(`The jobs are: `, jobs)),
      // map(jobs =>
      //   jobs.map((job: JobApplication) => ({
      //     ...job,
      //     date_sent: new Date(job.date_sent).toLocaleDateString('en-GB')
      //   }))
      // ),
      // tap(() => {
        // this.pageLoading = false;
      // })
    );
    
    this.cd.detectChanges()
    console.log("jobs observable in dashboard: ", this.jobs$)
  }

  showAddModal(event: MouseEvent) {
    (event.target as HTMLElement).blur()

    this.modalService.open(JobApplicationAddModal, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    })
  }

  showAddModalInEditMode(event: MouseEvent, job: JobApplication) {
    (event.target as HTMLElement).blur();

    const modalRef = this.modalService.open(JobApplicationAddModal, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    })

    // console.log("Passing userId: ", this.data.userId)
    // console.log("Passing id: ", this.data.id)
    modalRef.componentInstance.id = job._id
    modalRef.componentInstance.company_name = job.company_name
    modalRef.componentInstance.position = job.position
    const formattedDate = new Date(job.date_sent).toISOString().split('T')[0];
    modalRef.componentInstance.date_sent = formattedDate
    modalRef.componentInstance.location = job.location
    modalRef.componentInstance.min_salary = job.min_salary
    modalRef.componentInstance.max_salary = job.max_salary
    modalRef.componentInstance.status = job.status
  }

  async deleteJobApp(userId: string, id: string | undefined) {
    console.log("I run")
    const res = await this.jobsService.deleteJobApplication(userId, id)
  }

  trackById(index: number, item: any) {
    return item._id;  // or whatever unique key your object has
  }

  determineStatusContainerColor(status: string) {
    const normalizedStatus = status.trim().toLowerCase()

    if (normalizedStatus === 'pending') {
      return 'yellow-container'
    } else if (normalizedStatus === 'accepted') {
      return 'green-container'
    } else {
      return 'red-container'
    }
  }
}
