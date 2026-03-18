import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinHeader } from './loggedin-header';

describe('LoggedinHeader', () => {
  let component: LoggedinHeader;
  let fixture: ComponentFixture<LoggedinHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedinHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
