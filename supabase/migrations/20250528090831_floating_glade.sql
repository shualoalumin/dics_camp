/*
  # Create registrations table
  
  1. New Tables
    - `registrations` table for storing camp registration data
      - Basic student information
      - Contact details
      - Parent/guardian information
      - Additional information fields
  
  2. Security
    - Disable RLS for public access
    - No authentication required for form submissions
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS registrations;

-- Create registrations table
CREATE TABLE registrations (
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