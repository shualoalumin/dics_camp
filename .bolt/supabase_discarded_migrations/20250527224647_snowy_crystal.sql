/*
  # Create registrations table

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `birth_date` (date)
      - `school` (text)
      - `grade` (text)
      - `church` (text, nullable)
      - `message` (text, nullable)
      - `status` (text)

  2. Security
    - Enable RLS on `registrations` table
    - Add policies for:
      - Admins can read all registrations
      - New registrations can be inserted by anyone
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  birth_date date NOT NULL,
  school text NOT NULL,
  grade text NOT NULL,
  church text,
  message text,
  status text DEFAULT 'pending'
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new registrations
CREATE POLICY "Anyone can insert registrations"
  ON registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users (admins) can view registrations
CREATE POLICY "Authenticated users can view registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);