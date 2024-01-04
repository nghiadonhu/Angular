import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuakhComponent } from './suakh.component';

describe('SuakhComponent', () => {
  let component: SuakhComponent;
  let fixture: ComponentFixture<SuakhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuakhComponent]
    });
    fixture = TestBed.createComponent(SuakhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
