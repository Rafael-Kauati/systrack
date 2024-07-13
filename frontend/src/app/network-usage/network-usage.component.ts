import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-network-usage',
  templateUrl: './network-usage.component.html',
  styleUrls: ['./network-usage.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class NetworkUsageComponent implements OnInit {
  bytesRecv: number | null = null;
  bytesSent: number | null = null;

  pieChartDataRecv: ChartConfiguration<'pie'>['data'] = {
    labels: ['Received Bytes', 'Remaining'],
    datasets: [{
      data: [0, 100], // initial values
      backgroundColor: ['#FF6384', '#36A2EB']
    }]
  };

  pieChartDataSent: ChartConfiguration<'pie'>['data'] = {
    labels: ['Sent Bytes', 'Remaining'],
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
      await this.fetchNetworkUsage();

      interval(2000)
        .pipe(
          switchMap(() => this.fetchNetworkUsage())
        )
        .subscribe(
          () => {},
          error => console.error('Error fetching network usage:', error)
        );
    } catch (error) {
      console.error('Error fetching network usage:', error);
    }
  }

  private async fetchNetworkUsage() {
    try {
      const data = await this.apiService.getNetworkUsage();
      this.bytesRecv = parseFloat(data.bytesRecv);
      this.bytesSent = parseFloat(data.bytesSent);
      this.updateChartData();
    } catch (error) {
      throw error;
    }
  }

  private updateChartData() {
    if (this.bytesRecv !== null) {
      this.pieChartDataRecv.datasets[0].data = [this.bytesRecv, 100 - this.bytesRecv];
    }
    if (this.bytesSent !== null) {
      this.pieChartDataSent.datasets[0].data = [this.bytesSent, 100 - this.bytesSent];
    }
  }
}
