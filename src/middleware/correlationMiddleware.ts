import { Request, Response, NextFunction } from "express";
import { runWithCorrelationId } from "../utils/correlation";

/**
 * Express middleware to ensure every request has a correlation ID.
 * - Reuses `x-correlation-id` header if present
 * - Otherwise generates a new UUID
 */
export function correlationMiddleware(req: Request, res: Response, next: NextFunction) {
  const incomingId = (req.headers["x-correlation-id"] as string) || undefined;

  runWithCorrelationId(() => {
    // Attach correlation ID to response headers too (for downstream services/clients)
    res.setHeader("x-correlation-id", incomingId);
    next();
  }, incomingId);
}
