import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddataspComponent } from './addatasp.component';

describe('AddataspComponent', () => {
  let component: AddataspComponent;
  let fixture: ComponentFixture<AddataspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddataspComponent]
    });
    fixture = TestBed.createComponent(AddataspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
