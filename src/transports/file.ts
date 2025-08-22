import fs from "fs";
import path from "path";
import type { LogEntry } from "../logger";

const logFile = path.resolve(process.cwd(), "audit.log");

export function fileTransport(entry: LogEntry) {
  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");
}
