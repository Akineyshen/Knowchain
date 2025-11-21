export interface TestQuestion {
  question: string;
  options: string[]; 
  correct_answer: string; 
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  lesson_cost: number; 
  image_urls: string[]; 
  test_questions: TestQuestion[];
  max_points: number; 
  created_at: string;
}