import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlnccComponent } from './qlncc.component';

describe('QlnccComponent', () => {
  let component: QlnccComponent;
  let fixture: ComponentFixture<QlnccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlnccComponent]
    });
    fixture = TestBed.createComponent(QlnccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
