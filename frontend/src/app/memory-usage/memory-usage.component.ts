import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-memory-usage',
  templateUrl: './memory-usage.component.html',
  styleUrls: ['./memory-usage.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class MemoryUsageComponent implements OnInit {
  memoryUsage: number | null = null;
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Used Memory', 'Free Memory'],
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
      await this.fetchMemoryUsage();

      interval(5000)
        .pipe(
          switchMap(() => this.fetchMemoryUsage())
        )
        .subscribe(
          () => {},
          error => console.error('Error fetching memory usage:', error)
        );
    } catch (error) {
      console.error('Error fetching memory usage:', error);
    }
  }

  private async fetchMemoryUsage() {
    try {
      const data = await this.apiService.getMemoryUsage();
      this.memoryUsage = parseFloat(data);
      this.updateChartData();
    } catch (error) {
      throw error;
    }
  }

  private updateChartData() {
    if (this.memoryUsage !== null) {
      this.pieChartData.datasets[0].data = [this.memoryUsage, 100 - this.memoryUsage];
    }
  }
}
