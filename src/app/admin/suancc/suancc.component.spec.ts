import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuanccComponent } from './suancc.component';

describe('SuanccComponent', () => {
  let component: SuanccComponent;
  let fixture: ComponentFixture<SuanccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuanccComponent]
    });
    fixture = TestBed.createComponent(SuanccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
