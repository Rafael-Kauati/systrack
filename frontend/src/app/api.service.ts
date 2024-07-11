import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/resources';  

  async getCPUUsage() {
      const response = await fetch(`${this.apiUrl}?type=cpu`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
  }

  async getMemoryUsage() {
    const response = await fetch(`${this.apiUrl}?type=memory`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }

  async getDiskUsage() {
    const response = await fetch(`${this.apiUrl}?type=disk`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }

  async getBatteryUsage() {
    const response = await fetch(`${this.apiUrl}?type=battery`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }

  async getNetworkUsage() {
    const response = await fetch(`${this.apiUrl}?type=network`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }
}
