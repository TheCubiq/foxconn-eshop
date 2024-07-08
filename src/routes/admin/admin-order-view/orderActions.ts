import { supabase } from '$lib/supabase';

export async function loadOrders() {
  const { data, error } = await supabase.from('orders').select('*');
  return { data, error };
}

export async function cancelOrder(orderId: string) {
  const { data, error } = await supabase.rpc('cancel_order', { p_order_id: orderId });

  if (error) {
    return { error: error.message };
  }

  return { message: data };
}
