import { useHttp } from './http.ts'

export function useCourseApi() {
    const { get, post, put } = useHttp()

    return {
        getCourses: () => get<any>('/course'),
        getCourse: (cid: string) => get<any>(`/course/${cid}`),
        startCourse: (cid: string) => post<any>(`/course/${cid}/start`, {}),
        getLessons: (cid: string) => get<any>(`/course/${cid}/lessons`),
        getLesson: (cid: string, lid: string) => get<any>(`/course/${cid}/lessons/${lid}`),
        startLesson: (cid: string, lid: string) => post<any>(`/course/${cid}/lessons/${lid}/start`, {}),
        submitLesson: (cid: string, lid: string, payload: any) => post<any>(`/course/${cid}/lessons/${lid}/submit`, payload),
        updateCourseStatus: (cid: string, body: any) => put<any>(`/course/${cid}/status`, body),
    }
}