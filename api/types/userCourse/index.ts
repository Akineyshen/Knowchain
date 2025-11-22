export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  current_lesson_id: string | null; 
  status: 'started' | 'active' | 'completed' | 'failed'; 
  earned_points: number; 
  completed_lessons_count: number;
  created_at: string;
}