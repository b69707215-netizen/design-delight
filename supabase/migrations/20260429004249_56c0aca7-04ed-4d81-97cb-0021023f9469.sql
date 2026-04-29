CREATE POLICY "Admins can view content import runs"
ON public.content_import_runs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view content versions"
ON public.content_versions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
