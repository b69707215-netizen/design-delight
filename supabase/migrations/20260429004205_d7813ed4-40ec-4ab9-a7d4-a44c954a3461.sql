CREATE TABLE public.content_import_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'github',
  repo_full_name text,
  ref text,
  before_sha text,
  after_sha text,
  commit_sha text,
  delivery_id text UNIQUE,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'failed')),
  report jsonb NOT NULL DEFAULT '{}'::jsonb,
  warnings_count integer NOT NULL DEFAULT 0 CHECK (warnings_count >= 0),
  errors_count integer NOT NULL DEFAULT 0 CHECK (errors_count >= 0),
  triggered_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone
);

CREATE TABLE public.content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid REFERENCES public.content_import_runs(id) ON DELETE SET NULL,
  content_type text NOT NULL CHECK (content_type IN ('program', 'card', 'mdx')),
  content_key text NOT NULL,
  source_path text NOT NULL,
  commit_sha text,
  content_hash text NOT NULL,
  version_number integer NOT NULL CHECK (version_number >= 1),
  payload jsonb NOT NULL,
  imported_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (content_type, content_key, content_hash),
  UNIQUE (content_type, content_key, version_number)
);

CREATE INDEX idx_content_import_runs_commit_sha ON public.content_import_runs(commit_sha);
CREATE INDEX idx_content_import_runs_triggered_at ON public.content_import_runs(triggered_at DESC);
CREATE INDEX idx_content_versions_lookup ON public.content_versions(content_type, content_key, version_number DESC);
CREATE INDEX idx_content_versions_commit_sha ON public.content_versions(commit_sha);

ALTER TABLE public.content_import_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;