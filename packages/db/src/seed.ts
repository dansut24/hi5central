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

  console.log("Development seed complete.");
  console.log(`Tenant: ${tenantName}`);
  console.log(`User: ${userEmail}`);
  console.log(`Password: ${userPassword}`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.destroy();
  });
