-- GoodMood Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User profiles (extends Supabase auth.users)
create table public.user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  age integer not null,
  gender text not null,
  height numeric(5,1) not null,
  weight numeric(5,1) not null,
  goal text[] not null default '{}',
  activity_level text not null,
  equipment text not null,
  diet text not null,
  wellness_focus text[] not null default '{}',
  created_at timestamptz default now() not null
);

-- Workout plans
create table public.workout_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  week_number integer not null,
  created_at timestamptz default now() not null
);

-- Sessions within plans
create table public.sessions (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.workout_plans(id) on delete cascade not null,
  day text not null,
  title text not null,
  exercises jsonb not null default '[]'
);

-- Completed sessions tracking
create table public.completed_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  session_id text not null,
  completed_at timestamptz default now() not null
);

-- Nutrition plans
create table public.nutrition_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  week_number integer not null,
  meals jsonb not null default '{}',
  macros jsonb not null default '{}',
  created_at timestamptz default now() not null
);

-- Progress logs
create table public.progress_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  weight numeric(5,1),
  measurements jsonb,
  performance jsonb,
  created_at timestamptz default now() not null,
  unique(user_id, date)
);

-- Articles (blog)
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  category text not null,
  content text not null,
  cover_image text,
  excerpt text,
  published_at timestamptz default now() not null
);

-- Messages (coaching)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  coach_id uuid,
  content text not null,
  sender text not null default 'user',
  is_read boolean default false not null,
  sent_at timestamptz default now() not null
);

-- Row Level Security

alter table public.user_profiles enable row level security;
alter table public.workout_plans enable row level security;
alter table public.sessions enable row level security;
alter table public.completed_sessions enable row level security;
alter table public.nutrition_plans enable row level security;
alter table public.progress_logs enable row level security;
alter table public.messages enable row level security;
alter table public.articles enable row level security;

-- Policies: users access only their own data
create policy "Users manage own profile" on public.user_profiles
  for all using (auth.uid() = user_id);

create policy "Users manage own workout plans" on public.workout_plans
  for all using (auth.uid() = user_id);

create policy "Users view sessions of their plans" on public.sessions
  for select using (
    plan_id in (select id from public.workout_plans where user_id = auth.uid())
  );

create policy "Users manage own completed sessions" on public.completed_sessions
  for all using (auth.uid() = user_id);

create policy "Users manage own nutrition plans" on public.nutrition_plans
  for all using (auth.uid() = user_id);

create policy "Users manage own progress logs" on public.progress_logs
  for all using (auth.uid() = user_id);

create policy "Users manage own messages" on public.messages
  for all using (auth.uid() = user_id);

create policy "Articles are public" on public.articles
  for select using (true);

-- Gamification: XP tracking
create table if not exists public.user_xp (
  user_id uuid references auth.users(id) on delete cascade primary key,
  total_xp integer not null default 0,
  updated_at timestamptz default now()
);

create table if not exists public.xp_events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null,
  amount integer not null,
  created_at timestamptz default now() not null
);

create table if not exists public.user_badges (
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id text not null,
  earned_at timestamptz default now() not null,
  primary key (user_id, badge_id)
);

alter table public.user_xp enable row level security;
alter table public.xp_events enable row level security;
alter table public.user_badges enable row level security;

create policy "Users manage own xp" on public.user_xp
  for all using (auth.uid() = user_id);

create policy "Users manage own xp events" on public.xp_events
  for all using (auth.uid() = user_id);

create policy "Users manage own badges" on public.user_badges
  for all using (auth.uid() = user_id);

-- Sample articles
insert into public.articles (title, slug, category, content, excerpt, published_at) values
(
  '5 clés pour optimiser ta récupération musculaire',
  '5-cles-recuperation-musculaire',
  'sport',
  '<h2>Pourquoi la récupération est aussi importante que l''entraînement ?</h2>
  <p>La croissance musculaire ne se produit pas pendant la séance, mais après. Voici les 5 piliers d''une bonne récupération.</p>
  <h3>1. Le sommeil — le pilier fondamental</h3>
  <p>Durant le sommeil profond, ton corps libère de l''hormone de croissance. Vise 7-9h par nuit, avec une régularité dans tes horaires.</p>
  <h3>2. Les protéines post-workout</h3>
  <p>Consomme 25-40g de protéines dans les 2h après ta séance. Un shake de whey reste la solution la plus pratique.</p>
  <h3>3. L''hydratation</h3>
  <p>Une déshydratation de seulement 2% réduit les performances de 20%. Bois au moins 2-3L d''eau par jour.</p>
  <h3>4. Le froid (cryothérapie)</h3>
  <p>La douche froide post-entraînement réduit l''inflammation et accélère la récupération des fibres musculaires.</p>
  <h3>5. Le stretching actif</h3>
  <p>10 minutes d''étirements légers après chaque séance prévient les courbatures et améliore la flexibilité.</p>',
  'La croissance musculaire ne se produit pas pendant la séance mais après. Découvre les 5 piliers d''une récupération optimale.',
  now() - interval '2 days'
),
(
  'Whey, BCAA ou créatine : que choisir pour progresser ?',
  'whey-bcaa-creatine-que-choisir',
  'nutrition',
  '<h2>Le guide des suppléments sportifs</h2>
  <p>Le marché des suppléments est vaste et souvent confus. Voici ce que la science dit réellement sur les 3 plus populaires.</p>
  <h3>La Whey Protéine ⭐️ Must-have</h3>
  <p>La whey reste le supplément le mieux documenté. Elle apporte rapidement des acides aminés essentiels post-workout. Prends 25-30g après chaque séance.</p>
  <h3>La Créatine ⭐️ Must-have</h3>
  <p>La créatine monohydrate est l''un des suppléments les plus étudiés au monde. Elle augmente la force de 5-15% sur les efforts courts et intenses. 5g/jour suffit.</p>
  <h3>Les BCAA — Optionnels</h3>
  <p>Si tu consommes déjà suffisamment de protéines, les BCAA apportent peu d''avantage supplémentaire. Utile surtout si tu t''entraînes à jeun.</p>',
  'Whey, créatine, BCAA... Ce que la science dit vraiment sur les suppléments les plus populaires.',
  now() - interval '5 days'
),
(
  'Routine skincare homme : les bases pour bien démarrer',
  'routine-skincare-homme-bases',
  'wellness',
  '<h2>Skincare masculin : démystifier les préjugés</h2>
  <p>Prendre soin de sa peau n''est pas une question de genre. C''est une question de santé et de confiance en soi.</p>
  <h3>Les 3 étapes non-négociables</h3>
  <p><strong>1. Nettoyant doux</strong> — Deux fois par jour (matin et soir). Évite les savons de toilette classiques qui assèchent.</p>
  <p><strong>2. Hydratant</strong> — Même les peaux grasses ont besoin d''hydratation. Un gel non-comédogène pour les peaux mixtes.</p>
  <p><strong>3. SPF 30+ le matin</strong> — Le soleil est la première cause de vieillissement cutané prématuré. Pas négociable.</p>
  <h3>Bonus après 30 ans</h3>
  <p>Intègre un sérum vitamine C le matin pour l''éclat et la protection anti-oxydante. Commence le rétinol doucement 2x/semaine le soir.</p>',
  'Trois étapes simples pour prendre soin de ta peau et paraître au meilleur de toi-même.',
  now() - interval '8 days'
);
