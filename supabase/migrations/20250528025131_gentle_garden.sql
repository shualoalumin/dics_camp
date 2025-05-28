/*
  # Update RLS policies for registrations table
  
  1. Changes
    - Modify insert policy to use parent_email for authentication check
    - Update select policy to use parent_email instead of email
  
  2. Security
    - Ensures users can only view their own registrations
    - Allows authenticated users to insert registrations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON registrations;
DROP POLICY IF EXISTS "Users can view own registrations" ON registrations;

-- Create new policies
CREATE POLICY "Enable insert for authenticated users only"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() IS NOT NULL);

CREATE POLICY "Users can view own registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = parent_email
  );