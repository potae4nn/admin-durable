import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPriceComponent } from './report-price.component';

describe('ReportPriceComponent', () => {
  let component: ReportPriceComponent;
  let fixture: ComponentFixture<ReportPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
