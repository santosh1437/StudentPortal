// zoom.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private apiUrl = 'https://api.zoom.us/v2/users/me/meetings';

  async createMeeting(topic: string, startTime: string, accessToken: string): Promise<any> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          topic,
          type: 2, // Scheduled meeting
          start_time: startTime,
          duration: 60, // Meeting duration in minutes
          accessToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error:any) {
      throw error.response ? error.response.data : error.message;
    }
  }
}
