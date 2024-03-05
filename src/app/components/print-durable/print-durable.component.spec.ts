import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDurableComponent } from './print-durable.component';

describe('PrintDurableComponent', () => {
  let component: PrintDurableComponent;
  let fixture: ComponentFixture<PrintDurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
