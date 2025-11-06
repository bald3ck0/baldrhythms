/*
  # Create user_vault_access table

  1. New Tables
    - `user_vault_access`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (text, unique) - The user identifier from Stripe metadata
      - `vault_tier` (text) - Either "Royal" or "Imperial"
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `user_vault_access` table
    - Add policy for authenticated users to read their own vault access
*/

CREATE TABLE IF NOT EXISTS user_vault_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  vault_tier text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_vault_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own vault access"
  ON user_vault_access
  FOR SELECT
  TO authenticated
  USING (user_id = auth.jwt()->>'sub');

CREATE POLICY "Service role can insert vault access"
  ON user_vault_access
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update vault access"
  ON user_vault_access
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
