import { v4 as uuidv4 } from "uuid";
import { getCorrelationId } from "./utils/correlation";
import { consoleTransport } from "./transports/console";

export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  correlationId?: string;
  timestamp: string;
}

type Transport = (entry: LogEntry) => void;

export class AuditLogger {
  private correlationId: string;
  private transports: Transport[];

  constructor(correlationId?: string, transports: Transport[] = [consoleTransport]) {
    this.correlationId = correlationId || getCorrelationId();
    this.transports = transports;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      context,
      correlationId: this.correlationId,
      timestamp: new Date().toISOString(),
    };
    this.transports.forEach((t) => t(entry));
  }

  info(message: string, context?: Record<string, any>) {
    this.log("info", message, context);
  }
  warn(message: string, context?: Record<string, any>) {
    this.log("warn", message, context);
  }
  error(message: string, context?: Record<string, any>) {
    this.log("error", message, context);
  }
  debug(message: string, context?: Record<string, any>) {
    this.log("debug", message, context);
  }
}
