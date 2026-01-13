import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-application-add-modal',
  standalone: false,
  templateUrl: './job-application-add-modal.html',
  styleUrl: './job-application-add-modal.scss',
})
export class JobApplicationAddModal {
  constructor (public activeModal: NgbActiveModal) {}
}
