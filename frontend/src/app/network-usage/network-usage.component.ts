import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-network-usage',
  templateUrl: './network-usage.component.html',
  styleUrls: ['./network-usage.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NetworkUsageComponent implements OnInit {
  bytesRecv: number | null = null;
  bytesSent: number | null = null;

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
    } catch (error) {
      throw error;
    }
  }
}
