-- Database: cyber4pros

-- DROP DATABASE IF EXISTS cyber4pros;

CREATE DATABASE cyber4pros
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.pages

-- DROP TABLE IF EXISTS public.pages;

CREATE TABLE IF NOT EXISTS public.pages
(
    id integer NOT NULL DEFAULT nextval('pages_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    sort_order integer,
    CONSTRAINT pages_pkey PRIMARY KEY (id),
    CONSTRAINT pages_slug_key UNIQUE (slug)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pages
    OWNER to postgres;

-- Table: public.sections

-- DROP TABLE IF EXISTS public.sections;

CREATE TABLE IF NOT EXISTS public.sections
(
    id integer NOT NULL DEFAULT nextval('sections_id_seq'::regclass),
    page_id integer NOT NULL,
    type character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "order" integer NOT NULL,
    data jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sections_pkey PRIMARY KEY (id),
    CONSTRAINT sections_page_id_fkey FOREIGN KEY (page_id)
        REFERENCES public.pages (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sections
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    encrypted_password text COLLATE pg_catalog."default" NOT NULL,
    salt text COLLATE pg_catalog."default",
    sign_in_count integer DEFAULT 0,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying(45) COLLATE pg_catalog."default",
    last_sign_in_ip character varying(45) COLLATE pg_catalog."default",
    confirmation_token text COLLATE pg_catalog."default",
    confirmed_at timestamp without time zone,
    reset_password_token text COLLATE pg_catalog."default",
    reset_password_sent_at timestamp without time zone,
    locked_at timestamp without time zone,
    failed_attempts integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;