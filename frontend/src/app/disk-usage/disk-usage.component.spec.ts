import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskUsageComponent } from './disk-usage.component';

describe('DiskUsageComponent', () => {
  let component: DiskUsageComponent;
  let fixture: ComponentFixture<DiskUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiskUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiskUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
