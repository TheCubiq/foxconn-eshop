// src/routes/profile/+page.ts
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export const load: PageLoad = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    goto('/login');
    return {};
  }

  return {};
};
