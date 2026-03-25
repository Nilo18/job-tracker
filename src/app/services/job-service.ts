import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, firstValueFrom, map, Observable } from 'rxjs';
import { EnvironmentDetector } from './environment-detector';

export enum JobApplicationStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted'
}

export interface JobApplication {
  _id: string,
  userId: string,
  company_name: string,
  position: string,
  date_sent: Date | string,
  location: string,
  min_salary?: number,
  max_salary?: number,
  status: JobApplicationStatus
}

export interface JobApplicationResponse {
  status: number,
  jobs: JobApplication[]
  accepted: number,
  rejected: number,
  pending: number
}

export interface EditedApplicationResponse {
  status: number,
  jobApp: JobApplication
}

export interface ApplicationUpdateProperties {
  id: string
  newObject: JobApplication
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private environmentDetector = inject(EnvironmentDetector)
  private baseUrl = this.environmentDetector.getBackendBaseURL()
  private http = inject(HttpClient)
  public jobsSubject: BehaviorSubject<any> = new BehaviorSubject<JobApplication[] | null>(null)
  public jobsObs$ = this.jobsSubject.asObservable()
  private total: number = 0

  search(query: string): Observable<any> {
    if (query.trim() === '') {
      return EMPTY
    }

    return this.http.get<any>(`${this.baseUrl}/api/search`, {
      params: {keyword: query},
      headers: {'Authorization': 'Token 62d7c90c86f4ee0faeea6ffb94d8d1d77cd58a98'}
    })
  }

  async getJobApplications(userId: string, keyword?: string, filter?: string) {
    try {
      const res = await firstValueFrom(this.http.get<JobApplicationResponse>(`${this.baseUrl}/api/jobs/${userId}`, {
        params: {
          keyword: keyword ?? '',
          filter: filter ?? ''
        }
      }))
      this.total = res.jobs.length
      this.jobsSubject.next(res.jobs)
      return res
    } catch (error) {
      throw error
    }
  }

  async addJobApplication(newApplication: JobApplication) {
    try {
      const res = await firstValueFrom(this.http.post<EditedApplicationResponse>(`${this.baseUrl}/api/jobs`, newApplication))
      const current = this.jobsSubject.getValue()?? []
      this.jobsSubject.next([...current, res.jobApp])
      this.total = [...current, res.jobApp].length
      return res
    } catch (error) {
      throw error
    }
  }

  async updateJobApplication(properties: ApplicationUpdateProperties) {
    try {
      const res = await firstValueFrom(this.http.put<EditedApplicationResponse>(`${this.baseUrl}/api/jobs`, properties))
      const updated = this.jobsSubject.getValue().map((job: JobApplication) => job._id === res.jobApp._id ? res.jobApp : job)
      this.jobsSubject.next(updated)
      return res.jobApp
    } catch (error) {
      throw error
    }
  }

  async deleteJobApplication(userId: string, id: string | undefined) {
    try {
      const body = {userId: userId, id: id}
      const res = await firstValueFrom(this.http.delete<EditedApplicationResponse>(`${this.baseUrl}/api/jobs`, {body}))
      const current = this.jobsSubject.getValue() ?? []
      const newTasks = current.filter((job: any) => job._id !== id)
      this.jobsSubject.next(newTasks)
      this.total = newTasks.length
      return res.jobApp
    } catch (error) {
      throw error
    }
  }

  getTotal() {
    return this.total
  }
}
