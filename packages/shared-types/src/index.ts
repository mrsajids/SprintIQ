export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

export interface CreateTaskRequest {
    title: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}