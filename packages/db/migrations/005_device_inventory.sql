ALTER TABLE devices
ADD COLUMN IF NOT EXISTS cpu text,
ADD COLUMN IF NOT EXISTS ram_gb integer,
ADD COLUMN IF NOT EXISTS disk_gb integer,
ADD COLUMN IF NOT EXISTS gpu text,
ADD COLUMN IF NOT EXISTS logged_in_user text,
ADD COLUMN IF NOT EXISTS bitlocker_enabled boolean,
ADD COLUMN IF NOT EXISTS tpm_version text;
