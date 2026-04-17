-- SQL Schema for Supabase
-- Run this in the Supabase SQL Editor

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sector TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  body_desc TEXT,
  handover_date TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow anyone to read projects
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users to manage projects (if needed)
CREATE POLICY "Allow authenticated manage" ON projects
  FOR ALL USING (auth.role() = 'authenticated');
