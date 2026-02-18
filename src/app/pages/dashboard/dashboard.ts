import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { JobApplicationAddModal } from '../../components/job-application-add-modal/job-application-add-modal';
import { ApplicationUpdateProperties, JobApplication, JobService } from '../../services/job-service';
import { GoogleAuthServerResponse } from '../../services/google-api-service';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
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
  editing: Record<string, {
    name: boolean
    date: boolean
    status: boolean
  }> = {}
  baseURL: string = "http://localhost:3000"
  // pageLoading: boolean = true

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal, 
  public jobsService: JobService, public oAuthService: OAuthService, private http: HttpClient, 
  private cd: ChangeDetectorRef) {}

 async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // console.log(window.location.hash)
      const hash = window.location.search.substring(1) // Remove #
      const urlG = new URLSearchParams(hash)
      console.log(hash)
      console.log("access_token: ", urlG.get("access_token"))
      console.log("code: ", urlG.get("code"))
      // try {
        console.log("Running outside the if check in dashboard ngOnInit")
        let token = localStorage.getItem('jobF_token') 
        if (!token) {
          // this.pageLoading = true
          // console.log("Loading screen should be displayed: ", this.pageLoading)
          console.log("Running....")
          // const idToken = this.oAuthService.getIdToken();
          const code = urlG.get('code')
          const codeVerifier = sessionStorage.getItem('PKCE_verifier')
          console.log("Code verifier is: ", codeVerifier)

          const res = await firstValueFrom(this.http.post<GoogleAuthServerResponse>(`${this.baseURL}/api/auth/login`, {
            provider: 'google',
            code: code,
            code_verifier: codeVerifier
          }))

          console.log("Received response from the backend: ", res)
          localStorage.setItem('jobF_token', res.token)
          token = res.token
          console.log("Saved token to localStorage")
        }

        window.history.replaceState({}, document.title, window.location.pathname);
        console.log("Cleared URL input")
        const data = jwtDecode(token)
        this.data = data
        this.showLoggedInHeader = true
        // console.log("Loading screen should be displayed: ", this.pageLoading)
        // this.cd.detectChanges()
        console.log("Decoded token is: ", this.data)
        // this.pageLoading = false
        // this.cd.detectChanges()
        // console.log("Loading screen should be displayed: ", this.pageLoading)
      // } catch (error) {
      //   console.log("Auth check failed: ", error)
      // } 
      // finally {
      //   this.pageLoading = false
      //   console.log("Loading screen should be displayed: ", this.pageLoading)
      // }
    }
    
    this.jobsService.getJobApplications()
    console.log("jobs observable in the service: ", this.jobsService.jobsObs$)
    this.jobs$ = this.jobsService.jobsObs$.pipe(
      tap(jobs => console.log(`The jobs are: `, jobs)),
      map(jobs =>
        jobs.map((job: JobApplication) => ({
          ...job,
          date_sent: new Date(job.date_sent).toLocaleDateString('en-GB')
        }))
      ),
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
