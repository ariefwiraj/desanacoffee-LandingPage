CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data
INSERT INTO menu_categories (name, sort_order) VALUES
  ('Coffee', 1),
  ('Non Coffee', 2),
  ('Food & Snacks', 3),
  ('Seasonal', 4)
ON CONFLICT (name) DO NOTHING;
