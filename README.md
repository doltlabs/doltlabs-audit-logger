# @doltlabs/audit-log

[![npm version](https://img.shields.io/npm/v/@doltlabs/audit-log.svg)](https://www.npmjs.com/package/@doltlabs/audit-log)
[![Build Status](https://github.com/doltlabs/audit-log/actions/workflows/ci.yml/badge.svg)](https://github.com/doltlabs/audit-log/actions)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Lightweight audit logger with structured JSON output, correlation IDs, and pluggable transports.  
> Designed for **microservices** and **production-ready logging**.

---

## ✨ Features

- ✅ **Structured JSON logs** (ready for ELK/Datadog/Grafana)  
- ✅ **Correlation IDs** that propagate across async calls & requests  
- ✅ **Pluggable transports** (console, file — easy to extend)  
- ✅ **Express middleware** to attach correlation IDs automatically  
- ✅ Works standalone or with Winston/Pino  

---

## 📦 Installation

```bash
npm install @doltlabs/audit-log
# or
yarn add @doltlabs/audit-log
# or
pnpm add @doltlabs/audit-log
````

---

## 🚀 Usage

### Basic Logger

```ts
import { logger } from "@doltlabs/audit-log";

logger.info("User login", { userId: 123, ip: "10.0.0.1" });
logger.error("Payment failed", { userId: 123, amount: 99 });
```

**Output:**

```json
{
  "level": "info",
  "message": "User login",
  "context": { "userId": 123, "ip": "10.0.0.1" },
  "correlationId": "6f39a1f8-13e3-4f7b-8c2f-61f09a3a92a5",
  "timestamp": "2025-08-22T08:45:12.123Z"
}
```

---

### With Correlation IDs

```ts
import { createLogger } from "@doltlabs/audit-log";

const reqLogger = createLogger("req-12345");
reqLogger.info("Fetching invoices", { userId: 42 });
```

---

### Express Middleware

```ts
import express from "express";
import { correlationMiddleware } from "@doltlabs/audit-log/middleware/correlationMiddleware";
import { AuditLogger } from "@doltlabs/audit-log";
import { getCorrelationId } from "@doltlabs/audit-log/utils/correlation";

const app = express();

app.use(correlationMiddleware);

app.get("/hello", (req, res) => {
  const logger = new AuditLogger(getCorrelationId());
  logger.info("Hello endpoint hit", { route: "/hello" });
  res.json({ msg: "Hello world" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

➡️ Automatically attaches/propagates `x-correlation-id` header.

---

### File Transport

```ts
import { AuditLogger } from "@doltlabs/audit-log";
import { fileTransport } from "@doltlabs/audit-log/transports/file";

const logger = new AuditLogger(undefined, [fileTransport]);

logger.info("This will be written to audit.log");
```

---

## 🛠️ API

### `logger.info(message, context?)`

Log an info-level event.
Other levels: `warn`, `error`, `debug`.

### `createLogger(correlationId?)`

Create a new logger with a fixed correlation ID.

### `correlationMiddleware`

Express middleware to auto-generate or reuse correlation IDs.

### `fileTransport(entry)`

Transport to write logs to `audit.log`.

---

## 📚 Roadmap

* [ ] Koa/Fastify middleware
* [ ] Remote transport (HTTP/HTTPS)
* [ ] Structured log schemas
* [ ] Type-safe context validation (Zod)

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit your changes
4. Push and open a PR 🎉

We use **TypeScript**, **Vitest**, and **ESLint**.
Make sure all tests pass before submitting a PR:

```bash
npm run test
npm run lint
```

---

## 📜 License

MIT © [Dolt Labs](https://github.com/doltlabs)
