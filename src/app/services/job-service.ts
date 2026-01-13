import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, firstValueFrom, map, Observable } from 'rxjs';

export interface JobApplication {
  userId: string,
  company_name: string,
  date_sent: Date | string,
  status: string
}

export interface JobApplicationResponse {
  status: number,
  jobs: JobApplication[]
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // query=Frontend Developer&page=1&num_pages=1&country=georgia
  private baseUrl = 'http://localhost:3000/api'
  private http = inject(HttpClient)

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
      return res.jobs
    } catch (error) {
      console.log("Couldn't get job applications: ", error)
      throw error
    }
  }
}
