import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDurableComponent } from './report-durable.component';

describe('ReportDurableComponent', () => {
  let component: ReportDurableComponent;
  let fixture: ComponentFixture<ReportDurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
