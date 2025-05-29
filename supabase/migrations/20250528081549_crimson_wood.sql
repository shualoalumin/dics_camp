/*
  # Disable RLS for registrations table
  
  1. Changes
    - Disable Row Level Security (RLS) on registrations table
    - Drop existing policies as they won't be needed
  
  2. Security Note
    - This change allows public access to the registrations table
    - Suitable for public registration forms without authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON registrations;
DROP POLICY IF EXISTS "Users can view own registrations" ON registrations;

-- Disable RLS
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;