import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditDurableComponent } from './form-edit-durable.component';

describe('FormEditDurableComponent', () => {
  let component: FormEditDurableComponent;
  let fixture: ComponentFixture<FormEditDurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditDurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditDurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
