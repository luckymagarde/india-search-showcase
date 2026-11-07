CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 40),
 website text NOT NULL DEFAULT '',
 budget text NOT NULL DEFAULT '',
 goals text NOT NULL DEFAULT '',
 page_path text NOT NULL DEFAULT '/'
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.contact_submissions IS 'Private website enquiries. Owner reviews through Lovable Cloud Database; visitors have no read or write privileges. Server validates submissions before privileged insert.';