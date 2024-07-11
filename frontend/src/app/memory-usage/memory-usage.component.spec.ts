import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryUsageComponent } from './memory-usage.component';

describe('MemoryUsageComponent', () => {
  let component: MemoryUsageComponent;
  let fixture: ComponentFixture<MemoryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
