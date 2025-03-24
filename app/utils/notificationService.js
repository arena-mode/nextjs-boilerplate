// utils/notificationService.js
import supabaseClient from './supabaseClient';

const notificationService = {
  // Get user's notification preferences
  async getUserNotificationPrefs(userId) {
    const { data, error } = await supabaseClient
      .from('users')
      .select('notification_preferences, notification_style')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },
  
  // Update user's notification preferences
  async updateUserNotificationPrefs(userId, preferences, style) {
    const { data, error } = await supabaseClient
      .from('users')
      .update({
        notification_preferences: preferences,
        notification_style: style
      })
      .eq('id', userId);
    
    return { data, error };
  },
  
  // Get user's notifications
  async getUserNotifications(userId, limit = 10) {
    const { data, error } = await supabaseClient
      .from('notifications')
      .select(`
        id, 
        is_read, 
        created_at,
        content:content_id (
          id, 
          title, 
          tab
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },
  
  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabaseClient
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    return { data, error };
  }
};

export default notificationService;
