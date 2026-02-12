// Setup script to initialize Supabase database
// Run with: node scripts/setup-supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uhasritskbkicpwfwxbj.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYXNyaXRza2JraWNwd2Z3eGJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDczMzQwMCwiZXhwIjoyMDgwMzA5NDAwfQ.eBCuIWUCeDas5uwkVMyQ8B2Jg9g013mJo7WW3QR-Oyw';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const sampleBlogs = [
  {
    title: 'How Digital Marketing is Transforming Agriculture in India',
    subtitle: 'A comprehensive look at the digital revolution in farming',
    slug: 'digital-marketing-transforming-agriculture-india',
    content: '<h2>The Digital Revolution in Agriculture</h2><p>Agriculture in India is undergoing a significant transformation. With over 60% of India\'s population engaged in farming, the adoption of digital tools is becoming increasingly important for sustainable growth.</p><h2>Key Digital Trends</h2><ul><li><strong>Mobile-First Approach:</strong> Farmers are increasingly using smartphones to access market prices, weather information, and best practices.</li><li><strong>WhatsApp Communities:</strong> Agricultural brands are leveraging WhatsApp groups to share timely information with farmers.</li><li><strong>Audio Conferencing:</strong> Mass audio calls enable brands to reach farmers who may not be comfortable with text-based communication.</li></ul><h2>The Road Ahead</h2><p>As connectivity improves in rural India, we expect to see even greater adoption of digital tools in agriculture. Brands that invest in understanding farmer needs and delivering value through digital channels will be best positioned to succeed.</p>',
    author: 'Digicides Team',
    category: 'Marketing',
    tags: ['digital marketing', 'agriculture', 'rural india', 'farmer engagement'],
    meta_title: 'Digital Marketing in Agriculture India | Digicides Blog',
    meta_description: 'Discover how digital marketing is transforming agriculture in India and learn about key trends in farmer engagement and rural marketing.',
    status: 'published',
    word_count: 150,
    reading_time: 1,
  },
  {
    title: '5 Effective Strategies for Farmer Engagement',
    subtitle: 'Building lasting relationships with rural audiences',
    slug: '5-effective-strategies-farmer-engagement',
    content: '<h2>Introduction</h2><p>Engaging with farmers requires a unique approach that considers their specific needs, communication preferences, and daily challenges. Here are five proven strategies that work.</p><h2>1. Speak Their Language</h2><p>Communicate in regional languages and use simple, jargon-free terminology. Farmers appreciate content that respects their intelligence while being easy to understand.</p><h2>2. Leverage Audio Content</h2><p>Many farmers prefer audio over text. Mass audio conferencing and voice messages can be highly effective for product training and awareness campaigns.</p><h2>3. Timing Matters</h2><p>Schedule your communications around farming cycles. Early morning and evening hours often work best when farmers are not in the fields.</p><h2>4. Provide Genuine Value</h2><p>Share practical tips, weather updates, and market prices. Content that helps farmers in their daily work builds trust and loyalty.</p><h2>5. Build Community</h2><p>Create platforms where farmers can share experiences and learn from each other. Peer recommendations are incredibly powerful in rural communities.</p>',
    author: 'Digicides Team',
    category: 'Best Practices',
    tags: ['farmer engagement', 'rural marketing', 'communication strategies'],
    meta_title: 'Farmer Engagement Strategies | Digicides Blog',
    meta_description: 'Learn 5 effective strategies for engaging with farmers and building lasting relationships with rural audiences in India.',
    status: 'published',
    word_count: 200,
    reading_time: 1,
  },
];

async function checkTableExists() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id')
    .limit(1);
  
  return !error;
}

async function insertSampleBlogs() {
  console.log('Checking if blogs table exists...');
  
  const tableExists = await checkTableExists();
  
  if (!tableExists) {
    console.log('❌ Blogs table does not exist.');
    console.log('\nPlease run the following SQL in Supabase SQL Editor:');
    console.log('https://supabase.com/dashboard/project/uhasritskbkicpwfwxbj/sql/new');
    console.log('\n--- SQL to run ---');
    console.log(`
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow all operations for now
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON blogs FOR SELECT USING (true);

-- Allow all operations with service role
CREATE POLICY "Allow all for service role" ON blogs FOR ALL USING (true);
    `);
    console.log('--- End SQL ---\n');
    return;
  }
  
  console.log('✅ Blogs table exists!');
  
  // Check if table is empty
  const { data: existingBlogs, error: countError } = await supabase
    .from('blogs')
    .select('id');
  
  if (countError) {
    console.error('Error checking blogs:', countError);
    return;
  }
  
  if (existingBlogs && existingBlogs.length > 0) {
    console.log(`📝 Table already has ${existingBlogs.length} blog(s). Skipping sample data insertion.`);
    return;
  }
  
  console.log('📝 Inserting sample blogs...');
  
  const { data, error } = await supabase
    .from('blogs')
    .insert(sampleBlogs)
    .select();
  
  if (error) {
    console.error('Error inserting blogs:', error);
    return;
  }
  
  console.log(`✅ Successfully inserted ${data.length} sample blog(s)!`);
}

insertSampleBlogs().catch(console.error);