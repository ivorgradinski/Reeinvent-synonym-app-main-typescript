import { Request, Response, NextFunction } from 'express';

class ApiError extends Error {
    public statusCode: number;
    public details?: string;

    constructor(message: string, statusCode: number, details?: string) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

const callbackErrorHandler = (callback: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            const status = (error as ApiError).statusCode || 500;
            const message = (error as ApiError).message || 'An internal server error occurred';
            res.status(status).json({ message, details: (error as ApiError).details });
        }
    };
};

export {
    ApiError,
    callbackErrorHandler,
};
