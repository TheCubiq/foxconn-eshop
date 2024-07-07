
// src/routes/orders/+page.ts
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const load: PageLoad = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!browser) return {};
  if (!session) {
    console.log('No session')
    goto('/login');
  }

  return {};
};

