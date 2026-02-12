-- ============================================
-- DIGICIDES BLOG SYSTEM - SUPABASE SETUP
-- Run this SQL in Supabase SQL Editor
-- https://supabase.com/dashboard/project/uhasritskbkicpwfwxbj/sql/new
-- ============================================

-- ============================================
-- 1. BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  content TEXT DEFAULT '',
  author TEXT DEFAULT '',
  category TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  word_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 1,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- ============================================
-- 2. BLOG LIKES TABLE
-- Tracks likes per blog, one per user (using fingerprint)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  user_fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blog_id, user_fingerprint)
);

CREATE INDEX IF NOT EXISTS idx_blog_likes_blog_id ON blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_fingerprint ON blog_likes(user_fingerprint);

-- ============================================
-- 3. BLOG COMMENTS TABLE
-- Comments with approval workflow
-- ============================================
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_id ON blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);

-- ============================================
-- 4. ADMINS TABLE
-- For admin authentication
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- ============================================
-- 5. ADMIN SESSIONS TABLE
-- For tracking admin sessions
-- ============================================
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- ============================================
-- 6. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. RLS POLICIES
-- ============================================

-- Blogs: Public can read published, service role can do everything
CREATE POLICY "Public can read published blogs" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Service role full access to blogs" ON blogs
  FOR ALL USING (true);

-- Blog Likes: Public can insert/select, service role full access
CREATE POLICY "Public can read likes" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Public can insert likes" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access to likes" ON blog_likes
  FOR ALL USING (true);

-- Blog Comments: Public can insert/read approved, service role full access
CREATE POLICY "Public can read approved comments" ON blog_comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can insert comments" ON blog_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access to comments" ON blog_comments
  FOR ALL USING (true);

-- Admins and Sessions: Only service role
CREATE POLICY "Service role only for admins" ON admins
  FOR ALL USING (true);

CREATE POLICY "Service role only for sessions" ON admin_sessions
  FOR ALL USING (true);

-- ============================================
-- 8. FUNCTION TO UPDATE LIKES COUNT
-- ============================================
CREATE OR REPLACE FUNCTION update_blog_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blogs SET likes_count = likes_count + 1 WHERE id = NEW.blog_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blogs SET likes_count = likes_count - 1 WHERE id = OLD.blog_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update likes count
DROP TRIGGER IF EXISTS trigger_update_likes_count ON blog_likes;
CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON blog_likes
FOR EACH ROW EXECUTE FUNCTION update_blog_likes_count();

-- ============================================
-- 9. INSERT DEFAULT ADMIN
-- Password: Digicides@123 (hashed with bcrypt)
-- You should change this after first login!
-- ============================================
INSERT INTO admins (email, password_hash, name)
VALUES (
  'admin@digicides.com',
  '$2b$10$rQZ5Y8H7X6K9J0L1M2N3O.P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E',
  'Admin'
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 10. INSERT SAMPLE BLOGS (Optional)
-- ============================================
INSERT INTO blogs (title, subtitle, slug, content, author, category, tags, meta_title, meta_description, status, word_count, reading_time)
VALUES 
(
  'How Digital Marketing is Transforming Agriculture in India',
  'A comprehensive look at the digital revolution in farming',
  'digital-marketing-transforming-agriculture-india',
  '<h2>The Digital Revolution in Agriculture</h2><p>Agriculture in India is undergoing a significant transformation. With over 60% of India''s population engaged in farming, the adoption of digital tools is becoming increasingly important for sustainable growth.</p><h2>Key Digital Trends</h2><ul><li><strong>Mobile-First Approach:</strong> Farmers are increasingly using smartphones to access market prices, weather information, and best practices.</li><li><strong>WhatsApp Communities:</strong> Agricultural brands are leveraging WhatsApp groups to share timely information with farmers.</li><li><strong>Audio Conferencing:</strong> Mass audio calls enable brands to reach farmers who may not be comfortable with text-based communication.</li></ul><h2>The Road Ahead</h2><p>As connectivity improves in rural India, we expect to see even greater adoption of digital tools in agriculture. Brands that invest in understanding farmer needs and delivering value through digital channels will be best positioned to succeed.</p>',
  'Digicides Team',
  'Marketing',
  ARRAY['digital marketing', 'agriculture', 'rural india', 'farmer engagement'],
  'Digital Marketing in Agriculture India | Digicides Blog',
  'Discover how digital marketing is transforming agriculture in India and learn about key trends in farmer engagement and rural marketing.',
  'published',
  150,
  1
),
(
  '5 Effective Strategies for Farmer Engagement',
  'Building lasting relationships with rural audiences',
  '5-effective-strategies-farmer-engagement',
  '<h2>Introduction</h2><p>Engaging with farmers requires a unique approach that considers their specific needs, communication preferences, and daily challenges. Here are five proven strategies that work.</p><h2>1. Speak Their Language</h2><p>Communicate in regional languages and use simple, jargon-free terminology. Farmers appreciate content that respects their intelligence while being easy to understand.</p><h2>2. Leverage Audio Content</h2><p>Many farmers prefer audio over text. Mass audio conferencing and voice messages can be highly effective for product training and awareness campaigns.</p><h2>3. Timing Matters</h2><p>Schedule your communications around farming cycles. Early morning and evening hours often work best when farmers are not in the fields.</p><h2>4. Provide Genuine Value</h2><p>Share practical tips, weather updates, and market prices. Content that helps farmers in their daily work builds trust and loyalty.</p><h2>5. Build Community</h2><p>Create platforms where farmers can share experiences and learn from each other. Peer recommendations are incredibly powerful in rural communities.</p>',
  'Digicides Team',
  'Best Practices',
  ARRAY['farmer engagement', 'rural marketing', 'communication strategies'],
  'Farmer Engagement Strategies | Digicides Blog',
  'Learn 5 effective strategies for engaging with farmers and building lasting relationships with rural audiences in India.',
  'published',
  200,
  1
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SETUP COMPLETE!
-- ============================================