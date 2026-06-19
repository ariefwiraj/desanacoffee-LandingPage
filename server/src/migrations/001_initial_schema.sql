-- ============================================
-- Desana Coffee - Initial Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- OWNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MENUS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- WEBSITE CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_name VARCHAR(100) UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEED DATA
-- ============================================

-- Default Owner (password: desana2024)
INSERT INTO owners (email, password, name)
VALUES (
  'admin@desana.com',
  '$2a$10$s/Jfu2S.oyZSil8v7.Py3unAYuEsxiemqVBiL96PCn2n48G6Iz2ym',
  'Desana Owner'
) ON CONFLICT (email) DO NOTHING;

-- Menu Items
INSERT INTO menus (name, description, price, category, image_url, featured, sort_order) VALUES
  ('Desana Signature', 'Our signature blend crafted with locally sourced beans, featuring rich caramel notes and a smooth finish.', 25000, 'Coffee', NULL, true, 1),
  ('Manual Brew V60', 'Hand-poured V60 brewing method that highlights the unique characteristics of single-origin beans.', 30000, 'Coffee', NULL, true, 2),
  ('Americano', 'Bold espresso diluted with hot water for a clean, robust flavor profile.', 20000, 'Coffee', NULL, true, 3),
  ('Matcha Latte', 'Premium Japanese matcha whisked to perfection with steamed milk for a creamy, earthy experience.', 28000, 'Non Coffee', NULL, true, 4),
  ('Red Velvet Latte', 'A velvety smooth blend of red velvet and steamed milk topped with a hint of cream cheese foam.', 28000, 'Non Coffee', NULL, false, 5),
  ('Butter Croissant', 'Flaky, golden-brown croissant made with premium butter, baked fresh daily.', 22000, 'Food', NULL, false, 6),
  ('Festive Blend', 'A limited-edition seasonal blend featuring warm spices and notes of dark chocolate.', 35000, 'Seasonal', NULL, false, 7)
ON CONFLICT DO NOTHING;

-- Gallery Items
INSERT INTO gallery (image_url, caption, sort_order) VALUES
  ('/uploads/placeholder-gallery-1.jpg', 'Our cozy interior with warm lighting', 1),
  ('/uploads/placeholder-gallery-2.jpg', 'Barista crafting the perfect latte art', 2),
  ('/uploads/placeholder-gallery-3.jpg', 'Freshly roasted coffee beans', 3),
  ('/uploads/placeholder-gallery-4.jpg', 'Morning vibes at Desana Coffee', 4),
  ('/uploads/placeholder-gallery-5.jpg', 'Our signature drinks collection', 5),
  ('/uploads/placeholder-gallery-6.jpg', 'Weekend gathering at Desana', 6)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (customer_name, review, rating, avatar_url) VALUES
  ('Rina Kusuma', 'Desana Coffee has become my favorite spot! The Signature blend is absolutely amazing, and the atmosphere is so calming. Perfect for working or catching up with friends.', 5, NULL),
  ('Budi Santoso', 'I love their Manual Brew V60. You can really taste the difference in quality. The baristas are knowledgeable and always recommend great options.', 5, NULL),
  ('Maya Putri', 'The Matcha Latte here is the best I have ever tried! Creamy, not too sweet, and perfectly balanced. The croissants are also a must-try!', 4, NULL),
  ('Andi Prasetyo', 'Great coffee, great place. The Americano is simple but perfect. I come here every morning before work. Highly recommended for coffee lovers!', 5, NULL)
ON CONFLICT DO NOTHING;

-- Website Content sections
INSERT INTO website_content (section_name, title, subtitle, content, image_url) VALUES
  ('hero', 'Welcome to Desana Coffee', 'Where Every Cup Tells a Story', 'Experience the finest locally sourced coffee in a warm, inviting atmosphere.', NULL),
  ('about', 'Our Story', 'Crafted with Passion', 'Desana Coffee was born from a love for great coffee and community. We source our beans from local Indonesian farmers and roast them with care to bring out the best flavors in every cup.', NULL),
  ('contact', 'Visit Us', 'We would love to see you', 'Find us at the heart of the city. Open daily from 7 AM to 10 PM.', NULL)
ON CONFLICT (section_name) DO NOTHING;
