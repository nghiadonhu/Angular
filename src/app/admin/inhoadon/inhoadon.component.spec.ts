import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhoadonComponent } from './inhoadon.component';

describe('InhoadonComponent', () => {
  let component: InhoadonComponent;
  let fixture: ComponentFixture<InhoadonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InhoadonComponent]
    });
    fixture = TestBed.createComponent(InhoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
