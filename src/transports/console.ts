import type { LogEntry } from "../logger";

export function consoleTransport(entry: LogEntry) {
  // Pretty-print in dev, JSON in prod
  if (process.env.NODE_ENV === "development") {
    console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, entry);
  } else {
    console.log(JSON.stringify(entry));
  }
}
