import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationUpdateProperties, JobService } from '../../services/job-service';
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
  company_name!: string
  date_sent!: string
  status!: string
  id!: string
  btnText: string = 'Add'

  constructor (public activeModal: NgbActiveModal, private fb: FormBuilder, public jobsService: JobService) {}

  ngOnInit() {
    this.token = localStorage.getItem('jobF_token')

    if (this.company_name && this.date_sent && this.status) {
      console.log("date_sent was received as: ", this.date_sent)
      this.btnText = 'Save Changes'
    }

    if (this.token) {
      this.decodedToken = jwtDecode(this.token)
      this.jobappform = this.fb.group({
        userId: this.decodedToken._id,
        company_name: [this.company_name || '', [Validators.required]],
        position: ['', [Validators.required]],
        date_sent: [this.date_sent || '', [Validators.required]],
        location: ['', Validators.required],
        min_salary: ['', [Validators.max(10000000)]],
        max_salary: ['', [Validators.max(10000000)]],
        status: [this.status || 'Pending', Validators.required]
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
      if (!this.company_name && !this.date_sent && !this.status && !this.id) {
        await this.jobsService.addJobApplication(this.jobappform.value)
      } else {
        const body = {
          id: this.id,
          newObject: this.jobappform.value
        }
    
        console.log("The final body before sending the request is: ", body)
        console.log('jobappForm value is: ', body.newObject)

        const res = await this.jobsService.updateJobApplication(body)
        console.log("Received response after updating job application: ", res)
      }
    }
  }

  blockNegative(event: KeyboardEvent): void {
    // Block '-' (Minus) and 'e' (Scientific notation)
    if (['-', 'e', 'E', '+'].includes(event.key)) {
      event.preventDefault();
    }
  }

    blockNonNumbers(event: KeyboardEvent): void {
    // 1. Allow functional keys (navigation/deletion)
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    
    if (allowedKeys.includes(event.key)) {
      return; // Let these happen
    }

    // 2. Block anything that isn't a digit (0-9)
    // This blocks '-', 'e', '.', '+', and all letters
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

}
