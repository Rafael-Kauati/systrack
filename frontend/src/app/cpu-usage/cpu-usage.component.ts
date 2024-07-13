import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval, switchMap } from 'rxjs';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  imports: [CommonModule, BaseChartDirective],
  styleUrls: ['./cpu-usage.component.css'],
  standalone: true
})
export class CpuUsageComponent implements OnInit {
  cpuUsage: number | null = null;

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Used CPU', 'Free CPU'],
    datasets: [{
      data: [0, 100], 
      backgroundColor: ['#FF6384', '#36A2EB']
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie'; 

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
      this.updateChartData();
    } catch (error) {
      throw error;
    }
  }

  private updateChartData() {
    if (this.cpuUsage !== null) {
      this.pieChartData.datasets[0].data = [this.cpuUsage, 100 - this.cpuUsage];
    }
  }
}
