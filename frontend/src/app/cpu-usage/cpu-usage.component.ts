import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  imports : [CommonModule],
  styleUrls: ['./cpu-usage.component.css'],
  standalone: true
})
export class CpuUsageComponent implements OnInit {
  cpuUsage: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getCPUUsage();
      console.log('API Response:', data); 
      this.cpuUsage = parseFloat(data); 
      console.log("CPU usage : ", this.cpuUsage);
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
    }
  }
  
}
