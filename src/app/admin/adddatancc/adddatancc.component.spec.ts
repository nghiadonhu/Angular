import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatanccComponent } from './adddatancc.component';

describe('AdddatanccComponent', () => {
  let component: AdddatanccComponent;
  let fixture: ComponentFixture<AdddatanccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddatanccComponent]
    });
    fixture = TestBed.createComponent(AdddatanccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
