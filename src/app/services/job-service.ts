import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // query=Frontend Developer&page=1&num_pages=1&country=georgia
  private apiUrl = 'http://localhost:3000/api/search'
  private http = inject(HttpClient)

  search(query: string): Observable<any> {
    console.log(query)
    // try {
    //   const customHeaders = new HttpHeaders({
    //     'x-api-key': 'ak_2zi666ra96u7yocu6rtrwevxw4xxpi0k7w66sqhqi6c9c0o'
    //   })

    //   const options = {headers: customHeaders}

    //   console.log("Sending request (Inside search method)...")
    //   const res = await firstValueFrom(this.http.get(`${this.apiUrl}?query=${query}`, options))
    //   console.log(res)
    // } catch (error) {
    //   console.log("Couldn't send request: ", error)
    // }
    if (query.trim() === '') {
      console.log('Empty query detected, avoiding request.')
      return EMPTY
    }

    return this.http.get<any>(`${this.apiUrl}`, {
      params: {keyword: query},
      headers: {'Authorization': 'Token 62d7c90c86f4ee0faeea6ffb94d8d1d77cd58a98'}
    })
    // .pipe(
    //   map((job: any) => ({
    //     id: job.job_id,
    //     title: job.job_title,
    //     employer: job.employer_name,
    //     applyLink: job.job_apply_link
    //   }))
    // )
  }
}
