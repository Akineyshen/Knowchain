export interface Course {
  id: string;
  title: string;
  description: string | null;
  cost: number; 
  is_free: boolean; 
  course_status: 'available' | 'draft' | 'closed'; 
  created_at: string;
}