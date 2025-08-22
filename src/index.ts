import { AuditLogger } from "./logger";

export const logger = new AuditLogger();

// Allow creation of per-request loggers
export const createLogger = (correlationId?: string) => new AuditLogger(correlationId);
