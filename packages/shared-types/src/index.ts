// ==========================================
// 1. Shared Enums
// ==========================================

export type WorkspaceRole = 'ADMIN' | 'MEMBER';
export const WorkspaceRole = {
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
} as const;

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export const TaskStatus = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    IN_REVIEW: 'IN_REVIEW',
    DONE: 'DONE',
} as const;

export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';
export const SprintStatus = {
    PLANNED: 'PLANNED',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
} as const;

// ==========================================
// 2. Shared Domain Models
// ==========================================

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// Alias for AuthUser used in auth feature
export type AuthUser = User;

export interface Workspace {
    id: string;
    name: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface WorkspaceMember {
    id: string;
    role: WorkspaceRole;
    userId: string;
    workspaceId: string;
    user?: User;
    createdAt?: string | Date;
}

export interface Project {
    id: string;
    name: string;
    description?: string | null;
    workspaceId: string;
    createdById: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Sprint {
    id: string;
    name: string;
    goal?: string | null;
    status: SprintStatus;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    projectId: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: TaskStatus;
    projectId: string;
    createdById: string;
    sprintId?: string | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface ProjectBoard {
    TODO: Task[];
    IN_PROGRESS: Task[];
    IN_REVIEW: Task[];
    DONE: Task[];
}

// ==========================================
// 3. Shared API Requests & Responses
// ==========================================

// Generic API response
export interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
}

export interface ApiErrorResponse {
    message: string;
    status?: number;
    error?: string;
}

// Auth API
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export type RegisterPayload = RegisterRequest;

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}
export type LoginPayload = LoginRequest;

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshResponse {
    accessToken: string;
}
export type RefreshTokenResponse = RefreshResponse;

export interface LogoutRequest {
    refreshToken: string;
}

export interface LogoutResponse {
    message: string;
}

export interface ProtectedResponse {
    message: string;
    userId: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

// Workspace API
export interface CreateWorkspaceRequest {
    name: string;
}

export interface InviteWorkspaceMemberRequest {
    email: string;
}

export interface InviteWorkspaceMemberResponse {
    message: string;
    member: WorkspaceMember;
}

// Project API
export interface CreateProjectRequest {
    workspaceId: string;
    name: string;
    description?: string | null;
}
export type CreateProjectInput = CreateProjectRequest;

// Sprint API
export interface CreateSprintRequest {
    name: string;
    goal?: string | null;
    status?: SprintStatus;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
}
export type CreateSprintInput = CreateSprintRequest;

export interface UpdateSprintRequest {
    name?: string;
    goal?: string | null;
    status?: SprintStatus;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
}
export type UpdateSprintInput = UpdateSprintRequest;

// Task API
export interface CreateTaskRequest {
    title: string;
    description?: string | null;
}
export type CreateTaskInput = CreateTaskRequest;

export interface UpdateTaskRequest {
    title?: string;
    description?: string | null;
    status?: TaskStatus;
    sprintId?: string | null;
}
export type UpdateTaskInput = UpdateTaskRequest;