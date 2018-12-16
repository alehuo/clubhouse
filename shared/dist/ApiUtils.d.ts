export interface ApiError {
    message: string;
    exception?: Error;
    errors?: string[];
}
export interface ApiMessage {
    message: string;
}
export interface ApiResponse<T> {
    payload?: T;
    success: boolean;
    message?: string;
    error?: ApiError;
}
//# sourceMappingURL=ApiUtils.d.ts.map