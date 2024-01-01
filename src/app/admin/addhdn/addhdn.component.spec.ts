import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhdnComponent } from './addhdn.component';

describe('AddhdnComponent', () => {
  let component: AddhdnComponent;
  let fixture: ComponentFixture<AddhdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddhdnComponent]
    });
    fixture = TestBed.createComponent(AddhdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
