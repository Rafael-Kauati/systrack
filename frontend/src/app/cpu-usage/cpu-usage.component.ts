import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
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
      await this.fetchCPUUsage();
  
      interval(5000) 
        .pipe(
          switchMap(() => this.fetchCPUUsage())
        )
        .subscribe(
          () => {},
          error => console.error('Error fetching CPU usage:', error)
        );
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
    }
  }
  
  private async fetchCPUUsage() {
    try {
      const data = await this.apiService.getCPUUsage();
      this.cpuUsage = parseFloat(data);
    } catch (error) {
      throw error;
    }
  }
  
  
}
