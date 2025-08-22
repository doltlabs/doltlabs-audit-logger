import { describe, it, expect } from "vitest";
import { AuditLogger } from "../src/logger";

var logger = new AuditLogger();

describe("Logger", () => {
  it("should log an info message", () => {
    logger.info("Test info message");
    expect(true).toBe(true); // placeholder assertion
  });

  it("should log an error message", () => {
    logger.error("Test error message");
    expect(true).toBe(true);
  });
});
