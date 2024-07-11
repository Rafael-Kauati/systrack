import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disk-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disk-usage.component.html',
  styleUrl: './disk-usage.component.css'
})
export class DiskUsageComponent {
  diskUsage: number | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    try {
      const data = await this.apiService.getDiskUsage();
      this.diskUsage = parseFloat(data); 
    } catch (error) {
      console.error('Error fetching disk usage:', error);
    }
  }
}
