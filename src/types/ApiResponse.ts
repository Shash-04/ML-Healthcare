import {Report} from '@/models/User'

export interface ApiResponse {
  success: boolean;
  message: string;
  
  reports?: Array<Report>
};