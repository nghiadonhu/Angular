import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatakhComponent } from './adddatakh.component';

describe('AdddatakhComponent', () => {
  let component: AdddatakhComponent;
  let fixture: ComponentFixture<AdddatakhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddatakhComponent]
    });
    fixture = TestBed.createComponent(AdddatakhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
