import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';  // Import the CpuUsageComponent
import { CommonModule } from '@angular/common';
import { DiskUsageComponent } from "./disk-usage/disk-usage.component";
import { BatteryUsageComponent } from "./battery-usage/battery-usage.component";
import { MemoryUsageComponent } from "./memory-usage/memory-usage.component";
import { NetworkUsageComponent } from "./network-usage/network-usage.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CpuUsageComponent, CommonModule, DiskUsageComponent, BatteryUsageComponent, MemoryUsageComponent, NetworkUsageComponent],  // Add CpuUsageComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'systrack';
}
