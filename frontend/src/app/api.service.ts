import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/resources';  // Replace with your actual API URL

  async getCPUUsage() {
    try {
      const response = await fetch(`${this.apiUrl}?type=cpu`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  }
}
