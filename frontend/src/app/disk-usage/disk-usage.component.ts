import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-disk-usage',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './disk-usage.component.html',
  styleUrls: ['./disk-usage.component.css']
})
export class DiskUsageComponent implements OnInit {
  diskUsage: number | null = null;
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Used Disk', 'Free Disk'],
    datasets: [{
      data: [0, 100], // initial values
      backgroundColor: ['#FF6384', '#36A2EB']
    }]
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie'; // explicitly set the type to 'pie'

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      await this.fetchDiskUsage();
    } catch (error) {
      console.error('Error fetching disk usage:', error);
    }
  }

  private async fetchDiskUsage() {
    try {
      const data = await this.apiService.getDiskUsage();
      this.diskUsage = parseFloat(data);
      this.updateChartData();
    } catch (error) {
      throw error;
    }
  }

  private updateChartData() {
    if (this.diskUsage !== null) {
      this.pieChartData.datasets[0].data = [this.diskUsage, 100 - this.diskUsage];
    }
  }
}
