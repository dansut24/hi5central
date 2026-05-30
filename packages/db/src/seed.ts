import { hashPassword } from "@hi5central/auth";

import { createDb } from "./client";

const db = createDb();

const tenantSlug = "hi5central-demo";
const tenantName = "Hi5Central Demo";

const userEmail = "admin@hi5central.local";
const userPassword = "Password123!";

const defaultFeatures = [
  "remote_access",
  "background_mode",
  "attended_support",
  "patching",
  "advanced_patching",
  "backup",
  "branding",
  "api_access",
  "session_recording"
];

async function seed() {
  console.log("Starting Hi5Central development seed...");

  const existingTenant = await db
    .selectFrom("tenants")
    .selectAll()
    .where("slug", "=", tenantSlug)
    .executeTakeFirst();

  const tenant =
    existingTenant ??
    (await db
      .insertInto("tenants")
      .values({
        name: tenantName,
        slug: tenantSlug,
        plan: "msp",
        status: "active"
      })
      .returningAll()
      .executeTakeFirstOrThrow());

  const existingUser = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", userEmail)
    .executeTakeFirst();

  const passwordHash = await hashPassword(userPassword);

  const user =
    existingUser ??
    (await db
      .insertInto("users")
      .values({
        email: userEmail,
        password_hash: passwordHash,
        first_name: "Hi5Central",
        last_name: "Admin",
        status: "active"
      })
      .returningAll()
      .executeTakeFirstOrThrow());

  const existingMembership = await db
    .selectFrom("memberships")
    .selectAll()
    .where("tenant_id", "=", tenant.id)
    .where("user_id", "=", user.id)
    .executeTakeFirst();

  if (!existingMembership) {
    await db
      .insertInto("memberships")
      .values({
        tenant_id: tenant.id,
        user_id: user.id,
        role: "owner"
      })
      .execute();
  }

  const existingSubscription = await db
    .selectFrom("subscriptions")
    .selectAll()
    .where("tenant_id", "=", tenant.id)
    .executeTakeFirst();

  if (!existingSubscription) {
    await db
      .insertInto("subscriptions")
      .values({
        tenant_id: tenant.id,
        plan: "msp",
        status: "active",
        renewal_date: null
      })
      .execute();
  }

  for (const feature of defaultFeatures) {
    const existingFeature = await db
      .selectFrom("feature_flags")
      .selectAll()
      .where("tenant_id", "=", tenant.id)
      .where("feature_name", "=", feature)
      .executeTakeFirst();

    if (!existingFeature) {
      await db
        .insertInto("feature_flags")
        .values({
          tenant_id: tenant.id,
          feature_name: feature,
          enabled: true
        })
        .execute();
    }
  }

  const workstationGroup =
    (await db
      .selectFrom("device_groups")
      .selectAll()
      .where("tenant_id", "=", tenant.id)
      .where("name", "=", "Workstations")
      .executeTakeFirst()) ??
    (await db
      .insertInto("device_groups")
      .values({
        tenant_id: tenant.id,
        name: "Workstations",
        description: "Managed user workstations"
      })
      .returningAll()
      .executeTakeFirstOrThrow());

  const serverGroup =
    (await db
      .selectFrom("device_groups")
      .selectAll()
      .where("tenant_id", "=", tenant.id)
      .where("name", "=", "Servers")
      .executeTakeFirst()) ??
    (await db
      .insertInto("device_groups")
      .values({
        tenant_id: tenant.id,
        name: "Servers",
        description: "Managed servers"
      })
      .returningAll()
      .executeTakeFirstOrThrow());

  const demoDevices = [
    {
      tenant_id: tenant.id,
      device_group_id: workstationGroup.id,
      device_name: "CEO-LAPTOP",
      hostname: "CEO-LAPTOP",
      operating_system: "Windows 11 Pro",
      os_version: "24H2",
      agent_version: "1.0.0",
      status: "online",
      public_ip: "203.0.113.10",
      local_ip: "192.168.1.10",
      last_seen_at: new Date()
    },
    {
      tenant_id: tenant.id,
      device_group_id: workstationGroup.id,
      device_name: "HELPDESK-01",
      hostname: "HELPDESK-01",
      operating_system: "Windows 11 Pro",
      os_version: "24H2",
      agent_version: "1.0.0",
      status: "online",
      public_ip: "203.0.113.11",
      local_ip: "192.168.1.11",
      last_seen_at: new Date()
    },
    {
      tenant_id: tenant.id,
      device_group_id: serverGroup.id,
      device_name: "DC-01",
      hostname: "DC-01",
      operating_system: "Windows Server 2025",
      os_version: "2025",
      agent_version: "1.0.0",
      status: "online",
      public_ip: "203.0.113.20",
      local_ip: "10.0.0.10",
      last_seen_at: new Date()
    },
    {
      tenant_id: tenant.id,
      device_group_id: serverGroup.id,
      device_name: "FILE-01",
      hostname: "FILE-01",
      operating_system: "Windows Server 2022",
      os_version: "2022",
      agent_version: "1.0.0",
      status: "warning",
      public_ip: "203.0.113.21",
      local_ip: "10.0.0.11",
      last_seen_at: new Date()
    },
    {
      tenant_id: tenant.id,
      device_group_id: workstationGroup.id,
      device_name: "MACBOOK-PRO",
      hostname: "MACBOOK-PRO",
      operating_system: "macOS Sonoma",
      os_version: "14",
      agent_version: "1.0.0",
      status: "offline",
      public_ip: "203.0.113.30",
      local_ip: "192.168.1.30",
      last_seen_at: new Date(Date.now() - 86400000)
    },
    {
      tenant_id: tenant.id,
      device_group_id: workstationGroup.id,
      device_name: "UBUNTU-DEV",
      hostname: "UBUNTU-DEV",
      operating_system: "Ubuntu",
      os_version: "24.04",
      agent_version: "1.0.0",
      status: "online",
      public_ip: "203.0.113.40",
      local_ip: "192.168.1.40",
      last_seen_at: new Date()
    }
  ];

  for (const device of demoDevices) {
    const existingDevice = await db
      .selectFrom("devices")
      .selectAll()
      .where("tenant_id", "=", tenant.id)
      .where("hostname", "=", device.hostname)
      .executeTakeFirst();

    if (!existingDevice) {
      await db.insertInto("devices").values(device).execute();
    }
  }

  console.log("Development seed complete.");
  console.log(`Tenant: ${tenantName}`);
  console.log(`User: ${userEmail}`);
  console.log(`Password: ${userPassword}`);
  console.log(`Demo devices: ${demoDevices.length}`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.destroy();
  });
