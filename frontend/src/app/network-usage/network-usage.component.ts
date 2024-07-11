import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-network-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network-usage.component.html',
  styleUrl: './network-usage.component.css'
})
export class NetworkUsageComponent {
  bytesRecv: number | null = null;
  bytesSent: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getNetworkUsage();
      this.bytesRecv = parseFloat(data.bytesRecv); 
      this.bytesSent = parseFloat(data.bytesSent); 

    } catch (error) {
      console.error('Error fetching disk usage:', error);
    }
  }
}
