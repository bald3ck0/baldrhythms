/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for each user, auto-generated
      - `clerk_id` (text) - Clerk authentication ID for the user
      - `email` (text) - User's email address
      - `vaultTier` (text, default "none") - User's vault access tier
      - `created_at` (timestamptz) - Timestamp of when the user was created

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
    - Add policy for service role to insert new users (for webhook)
*/

-- Enable uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id text UNIQUE NOT NULL,
  email text NOT NULL,
  "vaultTier" text DEFAULT 'none',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = clerk_id);

-- Policy: Service role can insert new users (for webhooks)
CREATE POLICY "Service role can insert users"
  ON users
  FOR INSERT
  TO service_role
  WITH CHECK (true);