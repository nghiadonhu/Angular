import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatanvComponent } from './adddatanv.component';

describe('AdddatanvComponent', () => {
  let component: AdddatanvComponent;
  let fixture: ComponentFixture<AdddatanvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddatanvComponent]
    });
    fixture = TestBed.createComponent(AdddatanvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
