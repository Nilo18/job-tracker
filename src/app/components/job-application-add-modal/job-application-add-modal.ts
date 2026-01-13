import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../services/job-service';

@Component({
  selector: 'app-job-application-add-modal',
  standalone: false,
  templateUrl: './job-application-add-modal.html',
  styleUrl: './job-application-add-modal.scss',
})
export class JobApplicationAddModal {
  jobappform!: FormGroup

  constructor (public activeModal: NgbActiveModal, private fb: FormBuilder, public jobsService: JobService) {}

  ngOnInit() {
    this.jobappform = this.fb.group({
      company_name: ['', [Validators.required]],
      date_sent: ['', Validators.required],
      status: ['Pending', Validators.required]
    })
    console.log(typeof this.jobappform.value.date_sent)
  }

  async onSubmit() {
    console.log(typeof this.jobappform.value.date_sent)
    console.log(this.jobappform.value)
    await this.jobsService.addJobApplication(this.jobappform.value)
  }
}
