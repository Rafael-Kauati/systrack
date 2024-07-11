import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-memory-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-usage.component.html',
  styleUrl: './memory-usage.component.css'
})
export class MemoryUsageComponent {
  memoryUsage: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getBatteryUsage();
      this.memoryUsage = parseFloat(data); 
    } catch (error) {
      console.error('Error fetching disk usage:', error);
    }
  }
}
