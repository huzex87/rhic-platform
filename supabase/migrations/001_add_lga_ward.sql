-- Migration: Add LGA and Ward columns to profiles
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/ehthkntdxnnulchhjblv/sql

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS lga TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ward TEXT;
