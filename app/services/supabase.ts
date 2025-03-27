import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL\!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY\!
);

// Content management service
export const contentService = {
  async getContentByType(type: string) {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async deleteContent(id: string) {
    const { error } = await supabase
      .from("content")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  },

  async updateNotificationStatus(id: string, status: boolean) {
    const { error } = await supabase
      .from("content")
      .update({ notification: status })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  }
};

export default supabase;
