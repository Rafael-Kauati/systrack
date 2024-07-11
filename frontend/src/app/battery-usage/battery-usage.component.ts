import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-battery-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battery-usage.component.html',
  styleUrl: './battery-usage.component.css'
})
export class BatteryUsageComponent {
  battery: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getBatteryUsage();
      this.battery = parseFloat(data); 
    } catch (error) {
      console.error('Error fetching disk usage:', error);
    }
  }
}
