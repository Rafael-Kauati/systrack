import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-battery-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battery-usage.component.html',
  styleUrl: './battery-usage.component.css'
})
export class BatteryUsageComponent implements OnInit {
  battery: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      await this.fetchBatteryUsage();
  
      interval(8000) 
        .pipe(
          switchMap(() => this.fetchBatteryUsage())
        )
        .subscribe(
          () => {},
          error => console.error('Error fetching battery usage:', error)
        );
    } catch (error) {
      console.error('Error fetching battery usage:', error);
    }
  }
  
  private async fetchBatteryUsage() {
    try {
      const data = await this.apiService.getBatteryUsage();
      this.battery = parseFloat(data);
    } catch (error) {
      throw error;
    }
  }
  
}
