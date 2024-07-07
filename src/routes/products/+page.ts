// src/routes/products/+page.ts
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async () => {
    const { 
        data: products = [], 
        error 
    // } = await supabase.from('products').select('*');
    } = await supabase.from('products').select('*, stock(quantity)');

    if (error) console.error(error);

    return { products };
};
