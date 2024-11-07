import { ApiError } from '../utils/errorHandlers';

export const errors = {
    VALIDATION: (details: string): ApiError => new ApiError('Invalid input', 400, details),
    UNAUTHORIZED: (details: string): ApiError => new ApiError('Unauthorized access', 401, details),
    FORBIDDEN: (details: string): ApiError => new ApiError('Forbidden', 403, details),
    NOT_FOUND: (details: string): ApiError => new ApiError('Not found', 404, details),
    CONFLICT: (details: string): ApiError => new ApiError('Conflict in the request', 409, details),
    BAD_REQUEST: (details: string): ApiError => new ApiError('Bad request', 400, details),
    INTERNAL_ERROR: (details: string): ApiError => new ApiError('Server not responding', 500, details),
};
