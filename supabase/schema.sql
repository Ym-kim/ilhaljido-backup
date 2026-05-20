-- 워케이션 공간
CREATE TABLE spaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  region TEXT NOT NULL CHECK (region IN ('jeju', 'gangwon', 'jeonnam', 'gyeongnam', 'busan', 'other')),
  address TEXT NOT NULL,
  lat DECIMAL(10, 6),
  lng DECIMAL(10, 6),
  type TEXT NOT NULL CHECK (type IN ('cafe', 'coworking', 'pension', 'hotel', 'villa')),
  price_per_day INTEGER NOT NULL,
  price_per_month INTEGER,
  wifi_speed INTEGER,          -- Mbps
  noise_level SMALLINT CHECK (noise_level BETWEEN 1 AND 5),
  has_private_room BOOLEAN DEFAULT false,
  has_monitor BOOLEAN DEFAULT false,
  has_printer BOOLEAN DEFAULT false,
  near_nature BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 유저 프로필
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  job_type TEXT,
  work_style TEXT CHECK (work_style IN ('focused', 'collaborative', 'flexible')),
  preferred_regions TEXT[] DEFAULT '{}',
  budget INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 리뷰
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content TEXT,
  productivity_score SMALLINT CHECK (productivity_score BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 예약
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  space_id UUID REFERENCES spaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 (spaces, reviews)
CREATE POLICY "spaces_public_read" ON spaces FOR SELECT USING (is_active = true);
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);

-- 본인 프로필만 수정
CREATE POLICY "profiles_own" ON profiles USING (auth.uid() = id);

-- 로그인 유저만 예약/리뷰 작성
CREATE POLICY "bookings_own" ON bookings USING (auth.uid() = user_id);
CREATE POLICY "reviews_own_write" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 리뷰 등록 시 rating 자동 업데이트
CREATE OR REPLACE FUNCTION update_space_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE spaces
  SET
    rating = (SELECT AVG(rating) FROM reviews WHERE space_id = NEW.space_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE space_id = NEW.space_id)
  WHERE id = NEW.space_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_insert
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_space_rating();
