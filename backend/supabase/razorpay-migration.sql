-- Adds Razorpay (card / UPI) payments to an existing Trendify database.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.

alter table public.orders drop constraint if exists orders_payment_method_check;
alter table public.orders
  add constraint orders_payment_method_check check (payment_method in ('COD', 'Razorpay'));

alter table public.orders add column if not exists razorpay_order_id text unique;
alter table public.orders add column if not exists razorpay_payment_id text;
