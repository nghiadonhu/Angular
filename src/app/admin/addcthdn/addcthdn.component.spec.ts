import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcthdnComponent } from './addcthdn.component';

describe('AddcthdnComponent', () => {
  let component: AddcthdnComponent;
  let fixture: ComponentFixture<AddcthdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcthdnComponent]
    });
    fixture = TestBed.createComponent(AddcthdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
