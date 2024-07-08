// src/routes/+page.ts
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async () => {
    const { 
        data: products = [], 
        error 
    } = // await supabase.from('products').select('*');¨
    // get random products
    await supabase.from('random_products').select('*').limit(3);

    if (error) console.error(error);

    return { products };
};
