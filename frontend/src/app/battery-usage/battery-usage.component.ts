import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-battery-usage',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './battery-usage.component.html',
  styleUrls: ['./battery-usage.component.css']
})
export class BatteryUsageComponent implements OnInit {
  battery: number | null = null;
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [ 'Used Battery', 'Free Battery'],
    datasets: [{
      data: [0, 100], 
      backgroundColor: [ '#FF6384', '#36A2EB']
    }]
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie'; 

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
      this.updateChartData();
    } catch (error) {
      throw error;
    }
  }

  private updateChartData() {
    if (this.battery !== null) {
      this.pieChartData.datasets[0].data = [this.battery, 100 - this.battery];
    }
  }
}
