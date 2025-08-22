import { AsyncLocalStorage } from "node:async_hooks";
import { v4 as uuidv4 } from "uuid";

const als = new AsyncLocalStorage<Map<string, string>>();

const CORRELATION_KEY = "correlationId";

export function runWithCorrelationId<T>(fn: () => T, correlationId?: string): T {
  const store = new Map<string, string>();
  store.set(CORRELATION_KEY, correlationId || uuidv4());
  return als.run(store, fn);
}

export function getCorrelationId(): string {
  const store = als.getStore();
  return store?.get(CORRELATION_KEY) || uuidv4();
}

export function setCorrelationId(id: string) {
  const store = als.getStore();
  if (store) {
    store.set(CORRELATION_KEY, id);
  }
}

export function clearCorrelationId() {
  const store = als.getStore();
  if (store) {
    store.delete(CORRELATION_KEY);
  }
}
