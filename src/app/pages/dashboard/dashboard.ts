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
  /* These three are an array of flags for controlling their respective property editing in the table */
  showNameInputs: boolean[] = []
  showDateInputs: boolean[] = []
  showStatusInputs: boolean[] = []
  /* ------------------------------- */
  jobsArr: JobApplication[] = []
  companyNameControl = new FormControl('')
  dateControl = new FormControl('')
  statusControl = new FormControl('Pending')

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
    // const jobsSubj = this.jobsService.jobsSubject.getValue()
    this.jobs$.subscribe(jobs => {
      // this.showEditInputs.length = jobs.length  
      this.jobsArr = jobs
      console.log("The jobsArr is: ", this.jobsArr)
      this.showNameInputs = new Array(jobs.length).fill(false)
      this.showDateInputs = new Array(jobs.length).fill(false)
      this.showStatusInputs = new Array(jobs.length).fill(false)
      console.log("showEditInputs length is: ", this.showNameInputs.length)
      console.log("showEditInputs values are: ", this.showNameInputs)
    })

    // this.dateControl.valueChanges.subscribe(val => {
    //   if (val) {
    //     // this.editJobApp()
    //   }
    // })
    // if (jobsSubj && jobsSubj.length > 0) {
    //   console.log("jobsSubject inside dashboard component is: ", jobsSubj)
    
    //   console.log("showEditInputs length is: ", this.showEditInputs.length)
    // }
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

  async editJobApp(id: string | undefined, propertyName: string, val: string | null) {
    console.log("I am editJobApp and I run.")
    console.log('The edit input field value is: ', val)
    console.log('The dateControl value is: ', this.dateControl.value)

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

    this.companyNameControl.setValue('')
    // this.dateControl.setValue('')
    this.statusControl.setValue('Pending')
  }

  toggleNameEditInput(id: string | undefined) {
    if (!id) {
      console.log("Invalid id: ", id)
      return
    }

    const index = this.jobsArr.findIndex(job => job._id === id)

    if (index === -1) {
      console.log("Job not found (findIndex returned -1).")
      return
    }

    console.log(`Showing input for showEditInput[${index}]`)
    this.showNameInputs[index] = !this.showNameInputs[index]
  }

  toggleDateEditInput(id: string | undefined) {
    if (!id) {
      console.log("Invalid id: ", id)
      return
    }

    const index = this.jobsArr.findIndex(job => job._id === id)

    if (index === -1) {
      console.log("Job not found (findIndex returned -1).")
      return
    }

    console.log(`Showing input for showEditInput[${index}]`)
    this.showDateInputs[index] = !this.showDateInputs[index]
  }

  toggleStatusEditInput(id: string | undefined) {
    if (!id) {
      console.log("Invalid id: ", id)
      return
    }

    const index = this.jobsArr.findIndex(job => job._id === id)

    if (index === -1) {
      console.log("Job not found (findIndex returned -1).")
      return
    }

    console.log(`Showing input for showEditInput[${index}]`)
    this.showStatusInputs[index] = !this.showStatusInputs[index]
  }
}
