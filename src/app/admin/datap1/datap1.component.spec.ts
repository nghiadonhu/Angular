import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datap1Component } from './datap1.component';

describe('Datap1Component', () => {
  let component: Datap1Component;
  let fixture: ComponentFixture<Datap1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Datap1Component]
    });
    fixture = TestBed.createComponent(Datap1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
