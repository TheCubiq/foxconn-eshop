import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ params }) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!browser) return {};
  if (!session) {
    goto('/login');
  }

  return { orderId: params.id };
};
