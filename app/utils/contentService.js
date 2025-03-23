'use client';

import supabaseClient from './supabaseClient';

/**
 * Content Service - Handles all Supabase content operations
 * This centralized service manages content for all tabs and tiers with consistent error handling
 */
const contentService = {
  /**
   * Fetch content for a specific tab and tier
   * @param {string} tabName - The tab name (e.g., 'live-stream-alerts')
   * @param {string} userTier - User's access tier (e.g., 'free', 'inner-circle', 'shorting', 'cb-course')
   * @param {Object} options - Additional options for the query
   * @returns {Promise<Object>} - Query result with data and error properties
   */
  async getContentByTabAndTier(tabName, userTier = 'free', options = {}) {
    try {
      // Normalize tab name to lowercase and hyphenated format for consistency
      const normalizedTabName = tabName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-');
      
      console.log(`Fetching content for tab: ${normalizedTabName}, tier: ${userTier}`);
      
      // Start building the query
      let query = supabaseClient
        .from('content')
        .select('*')
        .eq('tab', normalizedTabName);
      
      // Filter by tier if specified (for non-admin users)
      if (userTier !== 'admin') {
        query = query.eq('tier', userTier);
      }
      
      // Add ordering if specified or default to created_at descending (newest first)
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      
      // Add limit if specified
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      // Execute the query
      const { data, error, status } = await query;
      
      // Log detailed information for debugging
      console.log(`Query status: ${status}, Results count: ${data?.length ?? 0}`);
      if (error) console.error('Query error:', error);
      if (data?.length === 0) console.log(`No data returned for tab: ${normalizedTabName}, tier: ${userTier}`);
      
      return { data, error, status };
    } catch (error) {
      console.error(`Error fetching content for tab ${tabName}:`, error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Fetch all content for a specific tab (admin view)
   * @param {string} tabName - The tab name (e.g., 'live-stream-alerts')
   * @param {Object} options - Additional options for the query
   * @returns {Promise<Object>} - Query result with data and error properties
   */
  async getAllContentByTab(tabName, options = {}) {
    try {
      // Normalize tab name
      const normalizedTabName = tabName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-');
      
      console.log(`Fetching all content for tab: ${normalizedTabName} (admin view)`);
      
      // Start building the query
      let query = supabaseClient
        .from('content')
        .select('*')
        .eq('tab', normalizedTabName);
      
      // Add ordering if specified or default to created_at descending
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      
      // Execute the query
      const { data, error, status } = await query;
      
      // Log detailed information for debugging
      console.log(`Admin query status: ${status}, Results count: ${data?.length ?? 0}`);
      if (error) console.error('Admin query error:', error);
      
      return { data, error, status };
    } catch (error) {
      console.error(`Error fetching admin content for tab ${tabName}:`, error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Add new content to a specific tab with tier access
   * @param {Object} content - Content object with tab, title, content, media, tier properties
   * @param {boolean} sendNotification - Whether to send notification for this content
   * @returns {Promise<Object>} - Insert result with data and error properties
   */
  async addContent(content, sendNotification = false) {
    try {
      // Normalize tab name
      const normalizedTab = content.tab
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-');
      
      // Ensure tier is specified, default to 'free' if not provided
      const tier = content.tier || 'free';
      
      // Prepare content object with normalized values
      const contentToAdd = {
        ...content,
        tab: normalizedTab,
        tier: tier,
        send_notification: sendNotification,
        notified: sendNotification, // Support both field names
        created_at: new Date().toISOString(),
      };
      
      console.log('Adding content:', contentToAdd);
      
      const { data, error, status } = await supabaseClient
        .from('content')
        .insert(contentToAdd)
        .select();
      
      console.log(`Add content status: ${status}`);
      if (error) console.error('Add content error:', error);
      
      return { data, error, status };
    } catch (error) {
      console.error('Error adding content:', error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Delete content by ID
   * @param {string} id - Content ID to delete
   * @returns {Promise<Object>} - Delete result with data and error properties
   */
  async deleteContent(id) {
    try {
      console.log(`Deleting content with ID: ${id}`);
      
      const { data, error, status } = await supabaseClient
        .from('content')
        .delete()
        .eq('id', id)
        .select();
      
      console.log(`Delete content status: ${status}`);
      if (error) console.error('Delete content error:', error);
      
      return { data, error, status };
    } catch (error) {
      console.error(`Error deleting content with ID ${id}:`, error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Update content properties
   * @param {string} id - Content ID to update
   * @param {Object} updates - Properties to update (tier, title, content, etc.)
   * @returns {Promise<Object>} - Update result with data and error properties
   */
  async updateContent(id, updates) {
    try {
      console.log(`Updating content ID ${id} with:`, updates);
      
      const { data, error, status } = await supabaseClient
        .from('content')
        .update(updates)
        .eq('id', id)
        .select();
      
      console.log(`Update content status: ${status}`);
      if (error) console.error('Update content error:', error);
      
      return { data, error, status };
    } catch (error) {
      console.error(`Error updating content ${id}:`, error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Update content notification status
   * @param {string} id - Content ID to update
   * @param {boolean} sendNotification - New notification status
   * @returns {Promise<Object>} - Update result with data and error properties
   */
  async updateNotificationStatus(id, sendNotification) {
    try {
      console.log(`Updating notification status for ID ${id} to ${sendNotification}`);
      
      const { data, error, status } = await supabaseClient
        .from('content')
        .update({ 
          send_notification: sendNotification,
          notified: sendNotification // Support both field names
        })
        .eq('id', id)
        .select();
      
      console.log(`Update notification status: ${status}`);
      if (error) console.error('Update notification error:', error);
      
      return { data, error, status };
    } catch (error) {
      console.error(`Error updating notification for content ${id}:`, error);
      return { data: null, error, status: 500 };
    }
  },
  
  /**
   * Get available tiers
   * Returns the list of available tiers in the system
   * @returns {Array} - List of available tiers
   */
  getTiers() {
    // Return all available tiers - can be expanded as needed
    return ['free', 'inner-circle', 'shorting', 'cb-course'];
  },
  
  /**
   * Test database connection and table access
   * Useful for verifying permissions and connectivity
   * @returns {Promise<Object>} - Test result with success status
   */
  async testConnection() {
    try {
      // Try to access the content table
      const { data, error, status } = await supabaseClient
        .from('content')
        .select('id')
        .limit(1);
      
      const success = !error && status >= 200 && status < 300;
      console.log(`Connection test: ${success ? 'Success' : 'Failed'}`);
      console.log(`Status: ${status}, Error: ${error ? JSON.stringify(error) : 'None'}`);
      
      return { 
        success, 
        status, 
        error, 
        message: success 
          ? 'Successfully connected to Supabase content table' 
          : `Failed to connect: ${error?.message || 'Unknown error'}`
      };
    } catch (error) {
      console.error('Connection test error:', error);
      return { 
        success: false, 
        status: 500, 
        error, 
        message: `Exception during connection test: ${error.message}`
      };
    }
  }
};

export default contentService;
