/*
  # Add student email field to registrations table

  1. Changes
    - Add student_email column to registrations table
    - Rename email column to parent_email for clarity
*/

DO $$ 
BEGIN
  -- Add student_email column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'student_email'
  ) THEN
    ALTER TABLE registrations ADD COLUMN student_email text NOT NULL;
  END IF;

  -- Rename email to parent_email
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'email'
  ) THEN
    ALTER TABLE registrations RENAME COLUMN email TO parent_email;
  END IF;
END $$;