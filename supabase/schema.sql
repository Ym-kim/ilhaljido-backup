-- =========================================
-- 일할지도 (Wakation) — Supabase Schema
-- =========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enums
create type program_category as enum ('growth', 'healing', 'network', 'global');
create type program_status as enum ('open', 'soon', 'full', 'closed');
create type application_status as enum ('pending', 'contacted', 'confirmed', 'cancelled');
create type work_style as enum ('focus', 'relaxed', 'balanced');

-- ─── PROGRAMS ───────────────────────────────────────
create table programs (
  id                  uuid primary key default uuid_generate_v4(),
  title               text not null,
  subtitle            text,
  description         text not null,
  category            program_category not null,
  status              program_status not null default 'soon',
  location            text not null,
  region              text not null,
  date_start          date not null,
  date_end            date not null,
  duration_nights     int not null,
  max_participants    int not null default 15,
  current_participants int not null default 0,
  price               int not null,
  price_includes      text[] not null default '{}',
  tags                text[] not null default '{}',
  image_url           text,
  is_featured         boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─── APPLICATIONS ───────────────────────────────────
create table applications (
  id                  uuid primary key default uuid_generate_v4(),
  program_id          uuid references programs(id) on delete set null,
  name                text not null,
  phone               text not null,
  email               text not null,
  job_type            text not null,
  work_style          work_style,
  interests           text[] not null default '{}',
  rest_preferences    text[] not null default '{}',
  duration_preference text,
  budget_range        text,
  message             text,
  status              application_status not null default 'pending',
  admin_memo          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─── AI RECOMMENDATIONS ─────────────────────────────
create table ai_recommendations (
  id                    uuid primary key default uuid_generate_v4(),
  application_id        uuid not null references applications(id) on delete cascade,
  recommended_programs  jsonb not null default '[]',
  recommendation_reason text not null,
  ai_model              text not null default 'claude-sonnet-4-6',
  created_at            timestamptz not null default now()
);

-- ─── UPDATED_AT TRIGGER ─────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger programs_updated_at
  before update on programs
  for each row execute function update_updated_at();

create trigger applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- ─── ROW LEVEL SECURITY ─────────────────────────────
alter table programs enable row level security;
alter table applications enable row level security;
alter table ai_recommendations enable row level security;

-- 누구나 프로그램 조회 가능
create policy "programs_public_read"
  on programs for select using (true);

-- 신청은 누구나 가능
create policy "applications_public_insert"
  on applications for insert with check (true);

-- AI 추천은 서버에서만 (service_role)
create policy "ai_rec_service_only"
  on ai_recommendations for all using (false);

-- ─── SEED DATA ──────────────────────────────────────
insert into programs (title, subtitle, description, category, status, location, region, date_start, date_end, duration_nights, max_participants, current_participants, price, price_includes, tags, image_url, is_featured) values

('AI 활용 실무 집중 캠프', '강원 속초 3박 4일', 'ChatGPT·이미지 AI·자동화 도구를 실무에 즉시 적용하는 집중 워크숍. 오전 업무, 오후 학습, 저녁 로컬 체험으로 구성됩니다.', 'growth', 'open', '강원 속초', '강원', '2026-06-12', '2026-06-15', 3, 12, 7, 990000, ARRAY['숙박비', '공유오피스 이용료', '프로그램 참가비', '조식'], ARRAY['AI 활용', '업무 자동화', '실습 중심', '공유오피스 포함'], 'https://picsum.photos/seed/sokcho-ocean/700/420', true),

('온라인 마케팅 & 상세페이지 집중반', '경기 가평 3박 4일', '랜딩페이지 기획·제작, SNS 광고 운영, 카피라이팅을 3일 만에 완성합니다. 개인 프로젝트 결과물을 직접 만들어 가세요.', 'growth', 'open', '경기 가평', '경기', '2026-06-26', '2026-06-29', 3, 12, 4, 890000, ARRAY['숙박비', '공유오피스 이용료', '프로그램 참가비'], ARRAY['마케팅', '상세페이지', '광고 운영', '공유오피스 포함'], 'https://picsum.photos/seed/gapyeong-forest/700/420', false),

('번아웃 탈출 힐링 워케이션', '충남 태안 4박 5일', '오전은 원하는 업무 집중, 오후부터는 완전한 쉼. 해변 산책, 요가, 로컬 맛집 투어로 일상 에너지를 완전히 충전합니다.', 'healing', 'open', '충남 태안', '충청', '2026-07-07', '2026-07-11', 4, 10, 6, 790000, ARRAY['숙박비', '업무 공간', '요가 클래스', '조식·석식'], ARRAY['힐링·휴식', '요가', '로컬 체험', '소규모'], 'https://picsum.photos/seed/taean-beach/700/420', false),

('1인 기업가 네트워킹 캠프', '강원 춘천 3박 4일', '같은 환경의 1인 기업가·프리랜서와 함께하는 워케이션. 비즈니스 피드백, 콜라보 탐색, 진짜 커넥션을 만드세요.', 'network', 'soon', '강원 춘천', '강원', '2026-07-23', '2026-07-26', 3, 15, 8, 850000, ARRAY['숙박비', '공유오피스 이용료', '네트워킹 프로그램'], ARRAY['네트워킹', '비즈니스 피드백', '콜라보'], 'https://picsum.photos/seed/chuncheon-lake/700/420', false),

('일본 시장조사 + 소도시 워케이션', '일본 오사카·교토 5박 6일', '일본 현지 시장 조사와 소도시 체류를 결합한 해외 워케이션. 글로벌 이커머스 진출을 준비 중인 셀러·기업가에게 최적입니다.', 'global', 'soon', '일본 오사카·교토', '해외', '2026-08-18', '2026-08-23', 5, 10, 3, 1490000, ARRAY['항공권', '숙박비', '업무 공간', '시장조사 투어'], ARRAY['일본', '시장조사', '글로벌', '이커머스'], 'https://picsum.photos/seed/osaka-japan/700/420', true),

('디자인 & 브랜딩 집중 캠프', '경남 통영 3박 4일', 'Figma, Canva, 브랜드 아이덴티티 설계를 집중적으로 다룹니다. 나만의 브랜드 키트를 3일 안에 완성해 가세요.', 'growth', 'soon', '경남 통영', '경남', '2026-08-27', '2026-08-30', 3, 12, 0, 890000, ARRAY['숙박비', '공유오피스 이용료', '프로그램 참가비'], ARRAY['디자인', '브랜딩', 'Figma', '실습 중심'], 'https://picsum.photos/seed/tongyeong-sea/700/420', false);
