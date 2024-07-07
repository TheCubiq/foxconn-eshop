import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

// Writable store to manage user state
export const user = writable<User | null>(null);

// Initialize the store with the current session, if any
import { supabase } from '$lib/supabase';
supabase.auth.getSession().then(({ data: { session } }) => {
  user.set(session?.user ?? null);
});

// Listen for changes in authentication state
supabase.auth.onAuthStateChange((_event, session) => {
  user.set(session?.user ?? null);
});
