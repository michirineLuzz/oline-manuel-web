-- Enable Row Level Security
ALTER DATABASE postgres SET timezone TO 'UTC';

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  ticket_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('performance', 'photoshoot', 'RabOline')),
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  youtube_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id BIGSERIAL PRIMARY KEY,
  stage_name TEXT NOT NULL,
  real_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  height TEXT NOT NULL,
  team TEXT NOT NULL,
  hobbies TEXT NOT NULL,
  debut TEXT NOT NULL,
  total_show TEXT NOT NULL,
  bio TEXT NOT NULL,
  fun_facts JSONB DEFAULT '[]'::jsonb,
  hashtags JSONB DEFAULT '[]'::jsonb,
  singles JSONB DEFAULT '[]'::jsonb,
  career_timeline JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON videos FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON profile FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to insert/update/delete
CREATE POLICY "Enable insert for authenticated users only" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON events FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON videos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON videos FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON videos FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON profile FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert initial profile data
INSERT INTO profile (stage_name, real_name, dob, height, team, hobbies, debut, total_show, bio, fun_facts, hashtags, singles, career_timeline)
VALUES (
  'Oline',
  'Oline Manuel',
  '3 November, 2007',
  '167cm',
  'Trainee',
  'Ballet dancing, drawing, painting.',
  '18 November, 2023',
  '90+ Show',
  'Oline a member of JKT48 12th generation, has gained widespread attention for her calm charm and gentle manner of speaking. Oline has a number of interesting unique qualities. She is talented in painting with a preference for abstract art, and is skilled in ballet, which she has been practicing since an early age. Additionally, Oline enjoys collecting patterned binder paper, loves photography, and regularly creates video recordings to document precious moments with her friends. Her very slow and calm manner of speaking is a distinctive trait, and at times, her voice is barely audible when greeting others.',
  '["Likes Gummy/Sour Gummy.", "Likes Hangyodon", "Close Friend with Erine.", "Her favorite food is Gado-gado, Egg and soy sauce.", "Has a pet dog named \"Kiyo, chico, and Hope\".", "Enjoys photography as a hobby.", "Collecting binder paper.", "Oline was called as one of the Pilar/Titan Trio in 12th generation along with Regie and Levi because of her tall body."]'::jsonb,
  '["Every Wednesday: #RabOline", "JKT48 Private Message: #NgobrOline", "Oline Raft: #OliNgerakit", "Friend Oline: #BrokOline", "Good Moring Greetings: #OhayOline"]'::jsonb,
  '[{"title": "Ama Nojaku Batta", "year": 2024}, {"title": "Chance No Junban", "year": 2024}]'::jsonb,
  '[{"date": "18 November 2023", "event": "Joined JKT48 as a 12th generation trainee."}, {"date": "1 March 2024", "event": "First stage performance with JKT48."}, {"date": "28 March 2024", "event": "Center Yuuhi Wo Miteiruka"}, {"date": "05 May 2024", "event": "Shonichi Off Air Naraya Fest"}, {"date": "11 May 2024", "event": "Shonichi MnG & 2 Shot"}, {"date": "30 June 2024", "event": "Center Waiting Room"}, {"date": "20 August 2024", "event": "MV Ama Nojaku Batta"}, {"date": "28 September 2024", "event": "Meet & Greet Road to Sousenkyou"}, {"date": "11 February 2024", "event": "Meet & Greet Sukinanda"}, {"date": "25 October 2025", "event": "Meet & Greet \"SISTER REUNION\" JKT48 & AKB48"}, {"date": "25 October 2025", "event": "Promoted to JKT48 Regular Member"}]'::jsonb
);

-- Insert sample gallery images from constants
INSERT INTO gallery_images (url, thumbnail_url, caption, category, width, height)
VALUES
  ('https://pbs.twimg.com/media/GVbaRAYaAAA3pZu?format=jpg&name=orig', 'https://pbs.twimg.com/media/GVbaRAYaAAA3pZu?format=jpg&name=orig', 'Ama Nojaku Batta', 'performance', 800, 1200),
  ('https://pbs.twimg.com/media/Gtam9DLboAAfrxs?format=jpg&name=orig', 'https://pbs.twimg.com/media/Gtam9DLboAAfrxs?format=jpg&name=orig', 'Theater Performance', 'performance', 1200, 800),
  ('https://pbs.twimg.com/media/G2wORqQaAAUwjJu?format=jpg&name=orig', 'https://pbs.twimg.com/media/G2wORqQaAAUwjJu?format=jpg&name=orig', '#RabOline', 'RabOline', 800, 1000),
  ('https://pbs.twimg.com/media/G2LhrBIawAAqgR1?format=jpg&name=orig', 'https://pbs.twimg.com/media/G2LhrBIawAAqgR1?format=jpg&name=orig', '#RabOline', 'RabOline', 1200, 800),
  ('https://pbs.twimg.com/media/G2LhrB7aIAIDaaB?format=jpg&name=orig', 'https://pbs.twimg.com/media/G2LhrB7aIAIDaaB?format=jpg&name=orig', '#RabOline', 'RabOline', 800, 1200),
  ('https://pbs.twimg.com/media/Gfp3SpDaIAEipk7?format=jpg&name=orig', 'https://pbs.twimg.com/media/Gfp3SpDaIAEipk7?format=jpg&name=orig', '#RabOline', 'RabOline', 800, 1000),
  ('https://pbs.twimg.com/media/GbIYf-pakAECGi7?format=jpg&name=orig', 'https://pbs.twimg.com/media/GbIYf-pakAECGi7?format=jpg&name=orig', '#RabOline', 'RabOline', 1200, 800),
  ('https://pbs.twimg.com/media/G3Y5Mria4AA73QF?format=jpg&name=orig', 'https://pbs.twimg.com/media/G3Y5Mria4AA73QF?format=jpg&name=orig', 'Vc Events', 'RabOline', 800, 1200),
  ('https://pbs.twimg.com/media/GykQPnmb0AAQeF6?format=jpg&name=orig', 'https://pbs.twimg.com/media/GykQPnmb0AAQeF6?format=jpg&name=orig', 'Konser Kemerdekaan', 'performance', 800, 1000),
  ('https://pbs.twimg.com/media/G3Etaa3awAECGv8?format=jpg&name=orig', 'https://pbs.twimg.com/media/G3Etaa3awAECGv8?format=jpg&name=orig', '', 'performance', 1200, 800),
  ('https://pbs.twimg.com/media/G4MrQHcWMAAOT5J?format=jpg&name=orig', 'https://pbs.twimg.com/media/G4MrQHcWMAAOT5J?format=jpg&name=orig', '', 'photoshoot', 1200, 800),
  ('https://pbs.twimg.com/media/GvG_2PGaAAAxW8h?format=jpg&name=orig', 'https://pbs.twimg.com/media/GvG_2PGaAAAxW8h?format=jpg&name=orig', '', 'performance', 800, 1000);

-- Insert sample videos from constants
INSERT INTO videos (youtube_id, title, thumbnail_url)
VALUES
  ('33H7HTUr0JE', '[CHEMISTRY] BESTIE BUKTIIN CHEMISTRY', 'https://img.youtube.com/vi/33H7HTUr0JE/hqdefault.jpg'),
  ('KV7OJLiMu6g', '[CEKIDOT] WAR TAKJIL HABIS 100RB?!', 'https://img.youtube.com/vi/KV7OJLiMu6g/hqdefault.jpg'),
  ('GI-mKEMmE6M', 'Breakfast Time With Oline', 'https://img.youtube.com/vi/GI-mKEMmE6M/hqdefault.jpg'),
  ('PYeXC8aMBaw', 'Saatnya Kesempatan - JKT48 | Pemilihan Member Single ke-26 JKT48 Official Theme Song', 'https://img.youtube.com/vi/PYeXC8aMBaw/hqdefault.jpg'),
  ('Ztg79dr34n4', '[MV] Belalang yang Membangkang - JKT48 Trainee', 'https://img.youtube.com/vi/Ztg79dr34n4/hqdefault.jpg'),
  ('e2rjHSjPyLA', 'Oline Manuel (Trainee) - Pemilihan Member Single ke-26 JKT48', 'https://img.youtube.com/vi/e2rjHSjPyLA/hqdefault.jpg'),
  ('VtRUL3XyfZo', 'JKT48 12th Generation Profile: Oline', 'https://img.youtube.com/vi/VtRUL3XyfZo/hqdefault.jpg');
