// Logger tests
import { describe, it } from 'node:test';
import { expect } from '@jest/globals';
import { AuditLogger } from '../src/logger';

describe('Logger', () => {
  it('should create a logger instance', () => {
    const logger = new AuditLogger();
    expect(logger).toBeInstanceOf(AuditLogger);
  });
});
