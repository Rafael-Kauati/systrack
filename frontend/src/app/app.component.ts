import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';  // Import the CpuUsageComponent
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CpuUsageComponent, CommonModule],  // Add CpuUsageComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'systrack';
}
