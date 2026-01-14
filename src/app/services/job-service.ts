import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, firstValueFrom, map, Observable } from 'rxjs';

export interface JobApplication {
  _id?: string,
  userId?: string,
  company_name: string,
  date_sent: Date | string,
  status: 'pending' | 'rejected' | 'accepted'
}

export interface JobApplicationResponse {
  status: number,
  jobs: JobApplication[]
}

export interface EditedApplicationResponse {
  status: number,
  jobApp: JobApplication
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // query=Frontend Developer&page=1&num_pages=1&country=georgia
  private baseUrl = 'http://localhost:3000/api'
  private http = inject(HttpClient)
  public jobsSubject: BehaviorSubject<any> = new BehaviorSubject<any[]>([])
  public jobsObs$ = this.jobsSubject.asObservable()

  search(query: string): Observable<any> {
    console.log(query)
    if (query.trim() === '') {
      console.log('Empty query detected, avoiding request.')
      return EMPTY
    }

    return this.http.get<any>(`${this.baseUrl}/search`, {
      params: {keyword: query},
      headers: {'Authorization': 'Token 62d7c90c86f4ee0faeea6ffb94d8d1d77cd58a98'}
    })
  }

  async getJobApplications() {
    try {
      const res = await firstValueFrom(this.http.get<JobApplicationResponse>(`${this.baseUrl}/jobs`))
      console.log('The job applications are: ', res)
      console.log("The jobs inside the GET response are: ", res.jobs)
      this.jobsSubject.next(res.jobs)
      return res.jobs
    } catch (error) {
      console.log("Couldn't get job applications: ", error)
      throw error
    }
  }

  async addJobApplication(newApplication: JobApplication) {
    try {
      const res = await firstValueFrom(this.http.post<EditedApplicationResponse>(`${this.baseUrl}/jobs`, newApplication))
      console.log('The new job was added to the database: ', res)
      const current = this.jobsSubject.getValue()
      this.jobsSubject.next([...current, res.jobApp])
      return res
    } catch (error) {
      console.log("Couldn't add job application: ", error)
      throw error
    }
  }

  async deleteJobApplication(id: string | undefined) {
    try {
      const res = await firstValueFrom(this.http.delete<EditedApplicationResponse>(`${this.baseUrl}/jobs/${id}`))
      const current = this.jobsSubject.getValue()
      const newTasks = current.filter((job: any) => job._id !== id)
      this.jobsSubject.next(newTasks)
      console.log(res)
      return res
    } catch (error) {
      console.log("Couldn't delete job application: ", error)
      throw error
    }
  }
}
