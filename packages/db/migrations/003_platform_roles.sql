ALTER TABLE users
ADD COLUMN IF NOT EXISTS platform_role text;

CREATE INDEX IF NOT EXISTS idx_users_platform_role ON users(platform_role);
