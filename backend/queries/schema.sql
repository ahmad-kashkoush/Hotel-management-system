-- Create bookings table
create table bookings (
    id bigserial not null,
    created_at timestamp with time zone null default current_timestamp,
    "startDate" timestamp without time zone null,
    "endDate" timestamp without time zone null,
    "numNights" smallint null,
    "numGuests" smallint null,
    "cabinPrice" double precision null,
    "extrasPrice" double precision null,
    "totalPrice" double precision null,
    status text null,
    "hasBreakfast" boolean null,
    "isPaid" boolean null,
    observations text null,
    "guestId" bigint null,
    "cabinId" bigint null,
    constraint bookings_pkey primary key (id),
    constraint bookings_cabinId_fkey foreign key ("cabinId") references cabins (id) ,
    constraint bookings_guestId_fkey foreign key ("guestId") references guests (id)
  ) tablespace pg_default;
--   Create cabins table
create table cabins (
    id bigserial not null,
    created_at timestamp with time zone null default current_timestamp,
    name text null,
    "maxCapacity" smallint null,
    "regularPrice" smallint null,
    discount smallint null,
    description text null,
    image text null,
    constraint cabins_pkey primary key (id)
  ) tablespace pg_default;

-- Create guests table
create table guests (
    id bigserial not null,
    created_at timestamp with time zone null default current_timestamp,
    "fullName" text null,
    email text null,
    nationality text null,
    "countryFlag" text null,
    "nationalID" text null,
    constraint guests_pkey primary key (id)
  ) tablespace pg_default;

-- Create settings table
create table settings (
    id bigserial not null,
    created_at timestamp with time zone null default current_timestamp,
    "minBookingLength" smallint null,
    "maxBookingLength" smallint null,
    "maxGuestsPerBooking" smallint null,
    "breakfastPrice" double precision null,
    constraint settings_pkey primary key (id)
  ) tablespace pg_default;