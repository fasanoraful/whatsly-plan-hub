/*
  # Create users table with trial license functionality

  1. New Tables
    - `users`
      - All fields from existing MySQL schema
      - Added proper types and constraints
      - Added RLS policies for security
  
  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  whatsapp_number text NOT NULL,
  license_key text NOT NULL,
  act_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date NOT NULL,
  deleted_key text NOT NULL DEFAULT 'no' CHECK (deleted_key IN ('yes', 'no')),
  life_time text NOT NULL,
  plan_type text NOT NULL,
  email text,
  skd_id text,
  fk_sk_id text,
  device_id text,
  config text,
  archive boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  modified_at timestamptz,
  device_name text,
  removed_at timestamptz,
  removal_manual boolean NOT NULL DEFAULT false,
  removed_manual_at timestamptz,
  build_version text,
  pc_id text,
  status boolean NOT NULL DEFAULT true,
  plan boolean NOT NULL DEFAULT true,
  user_id text NOT NULL,
  pro boolean NOT NULL DEFAULT true,
  subscription boolean NOT NULL DEFAULT false,
  chatgpt_key text,
  userdata text
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);