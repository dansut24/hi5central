import { Hono } from "hono";
import { cors } from "hono/cors";

import { authRoutes } from "./routes/auth";
import { dashboardRoutes } from "./routes/dashboard";
import { devicesRouter } from "./routes/devices";
import { healthRoutes } from "./routes/health";
import { heartbeatRoutes } from "./routes/heartbeat";
import { agentRoutes } from "./routes/agent";
import { inventoryRoutes } from "./routes/inventory";
import { platformAdminRoutes } from "./routes/platformAdmin";
import { platformImpersonationRoutes } from "./routes/platformImpersonation";
import { integrationsRoutes } from "./routes/integrations";
import { aiSettingsRoutes } from "./routes/aiSettings";
import { aiRoutes } from "./routes/ai";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [
      "https://hi5central.com",
      "https://app.hi5central.com"
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.route("/auth", authRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/devices", devicesRouter);
app.route("/health", healthRoutes);
app.route("/heartbeat", heartbeatRoutes);
app.route("/agent", agentRoutes);
app.route("/inventory", inventoryRoutes);
app.route("/platform-admin", platformAdminRoutes);
app.route("/platform-admin/impersonation", platformImpersonationRoutes);
app.route("/integrations", integrationsRoutes);
app.route("/ai-settings", aiSettingsRoutes);
app.route("/ai", aiRoutes);

export default app;
