import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryUsageComponent } from './battery-usage.component';

describe('BatteryUsageComponent', () => {
  let component: BatteryUsageComponent;
  let fixture: ComponentFixture<BatteryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
