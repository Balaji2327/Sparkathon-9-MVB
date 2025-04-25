/*
  # Create profiles and links tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `bio` (text)
      - `theme` (text)
      - `accent_color` (text)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `links`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `title` (text)
      - `url` (text)
      - `icon` (text)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  bio text,
  theme text DEFAULT 'light',
  accent_color text DEFAULT '#3B82F6',
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  icon text DEFAULT 'Link',
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read any profile"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for links
CREATE POLICY "Users can read any links"
  ON links
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own links"
  ON links
  FOR ALL
  TO authenticated
  USING (
    profile_id IN (
      SELECT id FROM profiles
      WHERE auth.uid() = profiles.id
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM profiles
      WHERE auth.uid() = profiles.id
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();