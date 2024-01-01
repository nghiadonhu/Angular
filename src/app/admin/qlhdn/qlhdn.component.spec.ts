import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlhdnComponent } from './qlhdn.component';

describe('QlhdnComponent', () => {
  let component: QlhdnComponent;
  let fixture: ComponentFixture<QlhdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlhdnComponent]
    });
    fixture = TestBed.createComponent(QlhdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
