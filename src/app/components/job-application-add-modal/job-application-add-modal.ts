import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../services/job-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-job-application-add-modal',
  standalone: false,
  templateUrl: './job-application-add-modal.html',
  styleUrl: './job-application-add-modal.scss',
})
export class JobApplicationAddModal {
  jobappform!: FormGroup
  token!: string | null
  decodedToken: any = null

  constructor (public activeModal: NgbActiveModal, private fb: FormBuilder, public jobsService: JobService) {}

  ngOnInit() {
    this.token = localStorage.getItem('jobF_token')
    if (this.token) {
      this.decodedToken = jwtDecode(this.token)
      this.jobappform = this.fb.group({
        userId: this.decodedToken._id,
        company_name: ['', [Validators.required]],
        date_sent: ['', Validators.required],
        status: ['Pending', Validators.required]
      })
      console.log(typeof this.jobappform.value.date_sent)
    } else {
      console.log("Failed to found token at localStorage.")
    }
  }

  async onSubmit() {
    if (this.token && this.decodedToken) {
      console.log(typeof this.jobappform.value.date_sent)
      console.log(this.jobappform.value)
      await this.jobsService.addJobApplication(this.jobappform.value)
    }
  }
}
