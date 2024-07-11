import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-memory-usage',
  templateUrl: './memory-usage.component.html',
  styleUrls: ['./memory-usage.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MemoryUsageComponent implements OnInit {
  memoryUsage: number | null = null;

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
    } catch (error) {
      throw error;
    }
  }
}
