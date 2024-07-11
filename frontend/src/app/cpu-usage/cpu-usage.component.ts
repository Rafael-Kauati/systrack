import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.css'],
  standalone: true
})
export class CpuUsageComponent implements OnInit {
  cpuUsage: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getCPUUsage();
      this.cpuUsage = data.cpu_usage;
      console.log("CPU usage : ", this.cpuUsage)
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
    }
  }
}