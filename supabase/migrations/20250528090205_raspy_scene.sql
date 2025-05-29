/*
  # Registration System Setup

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `student_name` (text)
      - `student_name_english` (text)
      - `student_phone` (text)
      - `student_email` (text)
      - `birth_date` (date)
      - `gender` (text)
      - `school` (text)
      - `grade` (text)
      - `parent_name` (text)
      - `parent_phone` (text)
      - `parent_email` (text)
      - `address` (text)
      - `church` (text)
      - `special_needs` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Disable RLS since this is a public registration form
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  student_name_english text NOT NULL,
  student_phone text NOT NULL,
  student_email text NOT NULL,
  birth_date date NOT NULL,
  gender text NOT NULL,
  school text NOT NULL,
  grade text NOT NULL,
  parent_name text NOT NULL,
  parent_phone text NOT NULL,
  parent_email text NOT NULL,
  address text NOT NULL,
  church text,
  special_needs text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Disable RLS since this is a public registration form
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;