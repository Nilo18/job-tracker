import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationAddModal } from './job-application-add-modal';

describe('JobApplicationAddModal', () => {
  let component: JobApplicationAddModal;
  let fixture: ComponentFixture<JobApplicationAddModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationAddModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationAddModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
