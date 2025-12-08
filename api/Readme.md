# User Management

`GET /user/me `

`POST /user/{userId}/tokens`

### GET user/me
    "id": "string",
    "username": "string",
    "email": "string",
    "createdAt": "2024-06-01T00:00:00Z"

### PUT /user/{userId}/tokens

    "amount": "500", // add 500 tokens

# Course Management

`GET /courses` - Get a list of courses with their status (available, active, completed)

`GET /courses/{courseId}` - Get detailed information about a course

`POST /courses/{courseId}/start` - Start a course

`PUT /courses/{courseId}/status`- Update the status of a course (e.g., mark as completed)

### GET /courses
    "id": "uuid-course-1",
    "title": "string",
    "cost": "0",
    "userStatus": "active" // available, active, completed

### POST /courses/{courseId}/start
    "user_id": "uuid-user",
    "course_id": "uuid-course",
    "status": "active",
    "earned_points": 0

## Lesson Routes
`GET /courses/{cId}/lessons` - Get a list of lessons

`GET /courses/{cId}/lessons/{lId}` - Get detailed information about a lesson (image, test)

`POST /courses/{cId}/lessons/{lId}/start` - Start a lesson, minus 500 tokens

`POST /courses/{cId}/lessons/{lId}/submit` - Send test answers and get tokens

### POST /courses/{courseId}/lessons/{lessonId}/start 
    "current_lesson_id": "uuid-lesson-id",
    "earned_points": 500,

### POST /courses/{courseId}/lessons/{lessonId}/submit
Request Body:

    "answers": [
        {
            { "question_id": "q1-uuid", "answer_index": 0}
            { "question_id": "q2-uuid", "answer_index": 2}
            { "question_id": "q3-uuid", "answer_index": 1}
        }
    ]

Response Body:

    {
        "message": "Test submitted successfully",
        "pointsAwared": 2000,
        "userCourse": {
            "earned_points": 2500,
            "completed_lessons_count": 1
        }
    }

# Admin Management
