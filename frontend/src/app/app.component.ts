import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';  // Import the CpuUsageComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CpuUsageComponent],  // Add CpuUsageComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'systrack';
}
