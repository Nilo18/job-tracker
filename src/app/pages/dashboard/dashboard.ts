import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { JobApplicationAddModal } from '../../components/job-application-add-modal/job-application-add-modal';
import { ApplicationUpdateProperties, JobApplication, JobService } from '../../services/job-service';
import { map, Observable, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  editing: Record<string, {
    name: boolean
    date: boolean
    status: boolean
  }> = {}

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal, 
  public jobsService: JobService) {}

  ngOnInit() {
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
          date_sent: new Date(job.date_sent).toLocaleDateString('en-GB')
        }))
      )
    );
  }

  showAddModal(event: MouseEvent) {
    (event.target as HTMLElement).blur()

    this.modalService.open(JobApplicationAddModal, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    })
  }

  async deleteJobApp(id: string | undefined) {
    console.log("I run")
    const res = await this.jobsService.deleteJobApplication(id)
  }

  async editJobApp(id: string | undefined, propertyName: string, val: string | null) {
    console.log("I am editJobApp and I run.")
    console.log('The edit input field value is: ', val)

    if (val?.trim() === '') {
      console.log('Edit input value can not be empty.')
      return
    }

    if (!id) {
      console.log('The id of the job application must be valid')
      return
    }

    const body: ApplicationUpdateProperties = {
      id: id,
      field: propertyName,
      newValue: val
    }

    console.log("The final body before sending the request is: ", body)

    const res = await this.jobsService.updateJobApplication(body)

    for (const key of Object.keys(this.editing[id]) as Array<'name' | 'date' | 'status'>) {
      this.editing[id][key] = false
    }
  }

  toggleEdit(id: string | undefined, field: 'name' | 'date' | 'status') {
    if (!id) {
      console.log('id is undefined')
      return
    }

    // lazy initialization
    this.editing[id] ??= { name: false, date: false, status: false }

    // close other fields
    // for (const key of Object.keys(this.editing[id]) as Array<'name' | 'date' | 'status'>) {
    //   this.editing[id][key] = false
    // }

    // toggle requested field
    this.editing[id][field] = !this.editing[id][field]
  }
}
