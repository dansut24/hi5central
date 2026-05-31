ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS selected_product TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;
