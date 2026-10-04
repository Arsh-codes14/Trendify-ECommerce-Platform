-- Trendify database schema for Supabase (PostgreSQL).
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.

-- PRODUCTS --------------------------------------------------------------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text not null,
  price        numeric(10, 2) not null check (price > 0),
  image        text[] not null default '{}',
  category     text not null,
  sub_category text not null,
  sizes        text[] not null default '{}',
  best_seller  boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists products_created_at_idx on public.products (created_at desc);

-- ORDERS ----------------------------------------------------------------
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  user_id        text not null,                 -- Clerk user id
  items          jsonb not null,                -- [{ productId, name, price, image, size, quantity }]
  subtotal       numeric(10, 2) not null,
  delivery_fee   numeric(10, 2) not null,
  amount         numeric(10, 2) not null,
  address        jsonb not null,
  status         text not null default 'Order Placed'
                 check (status in ('Order Placed', 'Packing', 'Shipped',
                                   'Out for Delivery', 'Delivered', 'Cancelled')),
  payment_method text not null default 'COD' check (payment_method in ('COD', 'Razorpay')),
  payment        boolean not null default false,
  razorpay_order_id   text unique,          -- set for card / UPI payments
  razorpay_payment_id text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id, created_at desc);

-- SECURITY --------------------------------------------------------------
-- Row Level Security with no policies: the public anon key cannot read or
-- write anything. Only the backend (service role key) can access these tables.
alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- STORAGE ---------------------------------------------------------------
-- Public bucket for product images uploaded from the admin panel.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
