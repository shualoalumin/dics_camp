/*
  # Registration System Setup

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `student_name` (text)
      - `student_name_english` (text)
      - `student_phone` (text)
      - `birth_date` (date)
      - `gender` (text)
      - `school` (text)
      - `grade` (text)
      - `parent_name` (text)
      - `parent_phone` (text)
      - `email` (text)
      - `address` (text)
      - `church` (text)
      - `special_needs` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on registrations table
    - Add policies for:
      - Insert: Allow authenticated users to create registrations
      - Select: Allow authenticated users to view their own registrations
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  student_name_english text NOT NULL,
  student_phone text NOT NULL,
  birth_date date NOT NULL,
  gender text NOT NULL,
  school text NOT NULL,
  grade text NOT NULL,
  parent_name text NOT NULL,
  parent_phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  church text,
  special_needs text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE auth.users.email = registrations.email
  ));